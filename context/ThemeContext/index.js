import React,{createContext, useState} from 'react'
import { DarkTheme,LightTheme } from './ThemeStyle';
const ThemeModeContext = createContext();


function ThemeContext({children}) {
    let [themeMode,setThemeMode] = useState("dark");
    let [color,setColor] = useState('black');

    return (
        <ThemeModeContext.Provider value={{themeMode,setThemeMode,color,setColor}}>
            {themeMode=="dark"?<DarkTheme/>:<LightTheme/>}
            {children}
        </ThemeModeContext.Provider>
    )
}

export{
    ThemeContext,
    ThemeModeContext
}