import { Camera, Users } from "lucide-react";
import Card from "../../components/created/Card";
import { memo } from "react";

const Dashboard = ()=>{
    return <div className= "grid lg:grid-cols-2 gap-10 md:grid-cols-1">
        <Card className="lg:col-span-2" ><CountCard/></Card>
        <Card><CountCard/></Card>
        <Card><CountCard/></Card>
        <Card className="lg:col-span-2 bg-[#2563EB] pointer"><MarkAttendenceCard/></Card>
        <Card className="lg:col-span-2 bg-[#2563EB] pointer"><MarkAttendenceCard/></Card>
    </div>;
}


const CountCardComp=()=>{
    return <div className="flex gap-4 items-center">
        <Users className="size-8"/>
        <div className="flex flex-col">
            <div className="text-[1.2rem]">0</div>
            <div className="text-[1rem]">Check-outs Today</div>
        </div>
    </div>
}

const MarkAttendenceCard=()=>{
    return <div className="w-full flex flex-col gap-2 items-center">
        <Camera className="size-10"/>
        <div className="font-medium text-[1.2rem] w-full text-center">Mark Attendence</div>
        <div>Capture Photo And Record Entry Exist</div>
    </div>
}


const CountCard = memo(CountCardComp);

export default Dashboard;