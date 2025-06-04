import { Calendar, Camera, CircleArrowOutDownLeft, CircleCheckBig, Users } from "lucide-react";
import Card from "../../components/created/Card";
import { memo, useMemo } from "react";
import useZustandStore, { statsLabel } from "../../zustand/store";
import { cn } from "../../lib/utils";

const Dashboard = ()=>{
    const keys = Object.keys(statsLabel);
    return <div className= "grid lg:grid-cols-2 gap-10 md:grid-cols-1">
        {keys.map((stat)=> <Card className={cn(stat === keys[2] && 'lg:col-span-2')}><CountCard cardType={stat as unknown as keyof DashboardDataType}/></Card>)}
        <Card className="lg:col-span-2 bg-[#2563EB] pointer text-white pointer"><MarkAttendenceCard isMarkAttendence/></Card>
        <Card className="lg:col-span-2"><MarkAttendenceCard/></Card>
    </div>;
}


const CountCardComp=({cardType}:CountCardType)=>{
    const {dashboardData} = useZustandStore();
    return <div className="flex gap-4 items-center">
        <CardIconHandler cardType={cardType}/>
        <div className="flex flex-col">
            <div className="text-[1.2rem]">{dashboardData[cardType]}</div>
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
    return <div className="w-full flex flex-col gap-2 items-center">
        {isMarkAttendence ? <Camera className="size-10"/> : <Calendar className="size-10"/>}
        
        <div className="font-medium text-[1.2rem] w-full text-center">{label1}</div>
        <div>{label2}</div>
    </div>
}


const CountCard = memo(CountCardComp);

export default Dashboard;