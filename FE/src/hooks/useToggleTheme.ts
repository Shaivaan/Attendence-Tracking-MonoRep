import { useEffect, useState } from "react";

const themeKey = 'theme';
const useToggleTheme = () => {
  const [isLightTheme, setIsLightTheme] = useState(() => 
    localStorage.getItem(themeKey) === 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLightTheme);
    localStorage.setItem(themeKey, isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  return { toggleTheme: () => setIsLightTheme(prev => !prev), isLightTheme };
};


  export default useToggleTheme;