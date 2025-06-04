import { useState } from "react";

  const useToggleTheme = () => {
    const [isLightTheme,setIsLightTheme] = useState(false);
    const toggleTheme = ()=>{
        const newIsDark = !isLightTheme;
        setIsLightTheme(newIsDark);
        if (newIsDark) document.documentElement.classList.add('light'); 
        else document.documentElement.classList.remove('light');
    }
    return {toggleTheme, isLightTheme};
  };

  export default useToggleTheme;