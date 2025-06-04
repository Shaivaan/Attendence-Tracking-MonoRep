import { useState } from "react";

  const useToggleTheme = () => {
    const [isDarkTheme,setIsDarkTheme] = useState(false);
    const toggleTheme = ()=>{
        const newIsDark = !isDarkTheme;
        setIsDarkTheme(newIsDark);
        if (newIsDark) document.documentElement.classList.add('dark'); 
        else document.documentElement.classList.remove('dark');
    }
    return toggleTheme;
  };

  export default useToggleTheme;