import { cn } from "../../lib/utils";

const Card = ({className,children}:ClassNameType & ChildrenType)=>{
    return <div className={cn("bg-[var(--card-bg)] card p-7 rounded-[var(--radius)] border-[374151]-100 border-1 w-full",className)}>
        {children}
    </div>
}

export default Card;