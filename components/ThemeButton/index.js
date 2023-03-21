import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { ThemeModeContext } from '../../context/ThemeContext';
import styles from '../ThemeButton/index.module.scss';
import { DarkMode, LightMode } from '@mui/icons-material';

function Index() {
    let [mode, setMode] = useState(false);
    let { themeMode, setThemeMode, color, setColor } = useContext(ThemeModeContext);

    function ToggleTheme() {
        setMode((mode = !mode));
        setThemeMode((themeMode = themeMode == 'dark' ? 'light' : 'dark'));
        setColor((color = color == 'black' ? 'light' : 'black'));
    }

    let ThemeButtonStyle = 'ThemeButton_' + themeMode;
    console.log(ThemeButtonStyle);

    return (
        <>
            <div className={`${styles[ThemeButtonStyle]}`} onClick={ToggleTheme}>
                {mode ? <DarkMode /> : <LightMode />}
            </div>
        </>
    );
}

export default Index;
