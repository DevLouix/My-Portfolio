import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import  { ThemeModeContext } from '../../context/ThemeContext'
import styles from '../ThemeButton/index.module.scss'


function Index() {  
    let [mode,setMode]=useState(false);
    let {themeMode,setThemeMode,color,setColor}=useContext(ThemeModeContext);

    function ToggleTheme(){
        setMode(mode=!mode);
        setThemeMode(themeMode = themeMode=="dark"?"light":"dark");
        setColor(color = color=="black"?"light":"black");
    }
    
    let ThemeButtonStyle = "ThemeButton_"+themeMode;
    console.log(ThemeButtonStyle);

  return (
    <>        
        <div className={`${styles[ThemeButtonStyle]}`} onClick={ToggleTheme}>
            {
                mode?<Image priority='high' height={24} width={24} src={'/darkmode.svg'} alt="darkThemeButton"/>:<Image height={24} width={24} priority='high' src={'/lightmode.svg'} alt="lightThemeButton"/>
            }
        </div>
    </>
  )
}

export default Index