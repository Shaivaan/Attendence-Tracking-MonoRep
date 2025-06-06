import { Calendar, Camera, CircleArrowOutDownLeft, CircleCheckBig, LoaderCircle, Users } from "lucide-react";
import Card from "../../components/created/Card";
import { memo, useEffect, useMemo } from "react";
import useZustandStore, { statsLabel } from "../../zustand/store";
import { base_url, cn, endpoints, routes } from "../../lib/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../components/created/Toast";


const Dashboard = ()=>{
    const keys = Object.keys(statsLabel);
    const {showToast} = useToast();
    const {handleDashboardData,dashboardData:{isLoadedOnce}} = useZustandStore();

    const getDashboardData = async() =>{
        handleDashboardData({isLoading:true});
        try{
            const {data} = await axios.get(base_url + endpoints.dashboard);
            handleSuccessSenario(data);
        }catch(err){
            showToast({message:'Something Went Wrong',variant:'error'});
        }finally{
            handleDashboardData({isLoading:false,isLoadedOnce:true});
        }
    }   

    const handleSuccessSenario = (data : SuccessDashboardDataType & SuccessObj)=>{
        const {data:{checkIn,checkOut,totalAttendee}} = data;
        handleDashboardData({checkIn,checkOut,totalAttendee})
    }

    useEffect(()=>{
        if(!isLoadedOnce) getDashboardData();
    },[])

    return <div className= "grid lg:grid-cols-2 gap-10 md:grid-cols-1">
        {keys.map((stat)=> <Card key={stat} className={cn(stat === keys[2] && 'lg:col-span-2')}><CountCard cardType={stat as unknown as keyof DashboardDataType}/></Card>)}
        <Card className="lg:col-span-2 bg-[#2563EB] pointer text-white pointer"><MarkAttendenceCard isMarkAttendence/></Card>
        <Card className="lg:col-span-2"><MarkAttendenceCard/></Card>
    </div>;
}


const CountCardComp=({cardType}:CountCardType)=>{
    const {dashboardData} = useZustandStore();
    const isLoading = useMemo(()=>dashboardData.isLoading,[dashboardData.isLoading]);
    return <div className="flex gap-4 items-center">
        <CardIconHandler cardType={cardType}/>
        <div className="flex flex-col">
            <div className="text-[1.2rem]">{!isLoading ? dashboardData[cardType] : <LoaderCircle className="load-icon"/>}</div>
            <div className="text-[1rem]">{statsLabel[cardType]}</div>
        </div>
    </div>
}

const CardIconHandler=({cardType}:CountCardType)=>{
    switch(cardType){
        case 'checkIn': return <CircleCheckBig className="size-8 text-green-600"/>
        case 'checkOut': return <CircleArrowOutDownLeft className="size-8 text-destructive" />
        default : return <Users className="size-8"/>
    }
};


const MarkAttendenceCard=({isMarkAttendence=false}:IsMarkAttendenceType)=>{
    const label1 = useMemo(()=>isMarkAttendence ? 'Mark Attendence' : 'View History',[isMarkAttendence]);
    const label2 = useMemo(()=>isMarkAttendence ? 'Capture photo and record entry/exit' : 'Check attendence records',[isMarkAttendence]);
    const navigateLink = useMemo(()=>isMarkAttendence ? routes.mark : routes.history,[isMarkAttendence]);
    return <Link to={navigateLink as string} >
        <div className="w-full flex flex-col gap-2 items-center">
            {isMarkAttendence ? <Camera className="size-10"/> : <Calendar className="size-10"/>}
            <div className="font-medium text-[1.2rem] w-full text-center">{label1}</div>
            <div>{label2}</div>
        </div>
    </Link>
}


const CountCard = memo(CountCardComp);

export default Dashboard;