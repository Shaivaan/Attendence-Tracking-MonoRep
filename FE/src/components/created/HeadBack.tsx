import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../lib/utils";

interface HeadBackType{
    heading:string
    shouldNavigateBack?:boolean
}

const HeadBack = ({heading,shouldNavigateBack=true}:HeadBackType)=>{
    const navigate = useNavigate();
    return <div className="flex gap-2 items-center mb-4 pointer w-fit" onClick={()=> shouldNavigateBack ? navigate(routes.home) : null}>
        {shouldNavigateBack && <ArrowLeft/>}
        <div className="font-medium text-2xl">{heading}</div>
    </div>
}

export default HeadBack