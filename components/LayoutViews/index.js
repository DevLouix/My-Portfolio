import styles from '../LayoutBody/index.module.scss'
import React, { useContext, useEffect } from 'react'
import Blog from '../Blog'
import Projects from '../Projects'
import Store from '../Store'
import Home from '../HomePage'
import { NavModeContext } from '../NavBar'
import { AboutMeTogglerMode } from '../_LayoutComponents/AboutMe/AboutMeToggler'
import { StoreContext } from '../../context/StoreContext'

function index() {
    let {layoutComponent} = useContext(NavModeContext)
    let {aboutMeMode} = useContext(AboutMeTogglerMode)

    function styler(className,Context) {
        let style = className+Context
        return style
    }

    return (
        <div className={`${styles[styler("content",aboutMeMode)]}`}>
            {
                layoutComponent == 'Home' ?
                    <Home/> :
                layoutComponent == 'Blog' ?
                    <Blog/>:
                layoutComponent == 'Store' ?
                    <StoreContext><Store/></StoreContext>:
                    <Projects/>
            }
        </div>
    )
}

export default index