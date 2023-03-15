import styles from '../AboutMe/index.module.scss'
import React, { createContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
const AboutMeTogglerMode = createContext();

function AboutMeToggler({children}) {
    let [aboutMeToggler,setAboutMeToggler] = useState(false)
    let [aboutMeMode,setAboutMeMode] = useState('Obsolete')

    function Toggle(){
        setAboutMeToggler(aboutMeToggler=!aboutMeToggler)
        if(aboutMeToggler){
            setAboutMeMode('Active')
        }else{
            setAboutMeMode('Obsolete')
        }
    }

    return (
        <AboutMeTogglerMode.Provider value={{aboutMeMode,setAboutMeMode}}>
            <button onClick={Toggle} className={styles.aboutMeToggler}><Link href='/about'>About</Link></button>
            {children}
        </AboutMeTogglerMode.Provider>
    )
}

export {
    AboutMeToggler,
    AboutMeTogglerMode
}