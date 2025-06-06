import { Moon, Sun } from "lucide-react"
import { Button } from "../shad-cn/button"
import useToggleTheme from "../../hooks/useToggleTheme"

const Header=()=>{
    const {isLightTheme,toggleTheme} = useToggleTheme();
    return <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <div className="text-3xl font-medium">Attendence Tracker</div>
            <div className="">Smart Attendence Mangement System</div>
        </div>
        <Button onClick={toggleTheme} className="py-4" size={'sm'} variant={!isLightTheme ? 'secondary' : 'ghost'}>
            {isLightTheme ?  <Sun className="size-[1.3rem]"/> : <Moon className="size-[1.3rem]"/>}
        </Button>
    </div>
}

export default Header;