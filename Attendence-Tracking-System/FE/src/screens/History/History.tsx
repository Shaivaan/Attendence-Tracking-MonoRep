import { useEffect } from "react";
import HeadBack from "../../components/created/HeadBack";
import { base_url, cn, endpoints } from "../../lib/utils";
import useZustandStore from "../../zustand/store";
import axios from "axios";
import { useToast } from "../../components/created/Toast";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import { getTimeData } from "./utils";
import { Button } from "../../components/shad-cn/button";

const History = ()=>{
    const {historyData:{isLoadedOnce,isLoading},handleHistoryData} = useZustandStore();
    const {showToast} = useToast();

    const fetchHistoryData = async()=> {
        handleHistoryData({isLoading:true});
        try{
            const {data} = await axios.get(base_url + endpoints.history);
            handleSuccess(data);
        }catch(err){
            showToast({message:'Something Went Wrong!',variant:'error'});
        }finally{
            handleHistoryData({isLoading:false,isLoadedOnce:true});
        }
    }

    useEffect(()=>{
        if(!isLoadedOnce) fetchHistoryData();
    },[])

    const handleSuccess = (data : HistoryResType)=>{
        if(data.success) handleHistoryData({data : data.data});
    }

    return <div className="relative">
        <HeadBack heading="History"/>
        <Button onClick={fetchHistoryData} variant={'ghost'} className="absolute top-[-4px] right-0"><RefreshCcw className="size-[1.5rem]"/></Button>
        <div className="rounded-[var(--radius)] bg-[var(--card-bg)] card p-10 gap-10 grid lg:grid-cols-2 grid-cols-1">
            {isLoading ? <Loader/> :  <CardHandler/>}
        </div>
    </div>
}

const CardHandler=()=>{
    const {historyData:{data}} = useZustandStore();
    if(data.length) return data.map((history)=><HistoryCardParent key={history.email} {...history}/>)
    return <div className="flex justify-center items-center w-full !col-span-2 h-[15rem]">
        Nothing Recorded Today
    </div>
}

const Loader=()=>{
    return <div className="flex justify-center items-center w-full !col-span-2 h-[15rem]">
        <LoaderCircle className="load-icon"/>
    </div>
}

const HistoryCardParent=({checkIn,checkout,email,name}:HistoryCardType)=>{ 
    let dataToMap = [checkIn];
    if(checkout !== null) dataToMap = [...dataToMap,checkout];
    return <>{dataToMap.map((card,index:number)=>card!==null ? <HistoryCard key={card.time} isDoneForDay={dataToMap.length === 2} isEntry={index === 0} email={email} name={name} photo={card.photo} time={card.time}/> : null)}</>
}

const HistoryCard = ({name,email,isEntry,photo,isDoneForDay,time}:Pick<HistoryCardType,'email' | 'name'> & TimePhoto & {isEntry:boolean,isDoneForDay:boolean})=>{
    return <div className={cn("card p-5 flex justify-between items-center w-full border-[var(--text-color)]-500 border-1 rounded-[var(--radius)] col-span-2",isDoneForDay && 'col-span-1')}>
        <div className="flex gap-5">
            <img src={photo}  alt="Employee image" className="h-[5rem] object-cover w-[5rem] rounded-[var(--radius)]" loading="lazy"/>
            <div className="flex flex-col gap-2 justify-center">
                <div className="text-[1.2rem] font-bold">{name}</div>
                <div className="text-[0.84rem]">{email}</div>
                <div className="text-[0.8rem]">{getTimeData(time)}</div>
            </div>    
        </div>
        <div className={cn("chip",isEntry ? 'text-green-400' : 'text-destructive')}>{isEntry ? 'Check In' : 'Check Out'}</div>
    </div>
}



export default History;