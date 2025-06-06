import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../lib/utils";

interface HeadBackType{
    heading:string
}

const HeadBack = ({heading}:HeadBackType)=>{
    const navigate = useNavigate();
    return <div className="flex gap-2 items-center mb-4 pointer w-fit" onClick={()=>navigate(routes.home)}>
        <ArrowLeft/>
        <div className="font-medium text-2xl">{heading}</div>
    </div>
}

export default HeadBack