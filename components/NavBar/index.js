import styles from '../NavBar/index.module.scss'
import styled from 'styled-components'
import React, { createContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Menu from './menu'
import Image from 'next/image'
const NavModeContext = createContext()

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const Logo = styled.div`
    z-index: 9999;
    padding-top: 10px;
    padding-left: 30px;
`

function NavContext({children}) {
    let [showMenu,setShowMenu] = useState(false)

    return (
        <NavModeContext.Provider value={{showMenu,setShowMenu}}>
            <GridContainer>
                    <Logo>
                        <h1 className={`${styles.logo} animate__animated animate__fadeIn`} >Dev <span className='animate__animated animate__backInRight'>Louix</span>
                        </h1>
                    </Logo>
                    <nav className={styles.navlinks_container}>
                        <ul className={`${styles.navlinks}`}>
                            <li><Link href='/'><a><h3>HOME</h3></a></Link></li>
                            <li><Link href='blog'><a><h3>BLOG</h3></a></Link></li>
                            <li><Link href='store'><a><h3>STORE</h3></a></Link></li>
                            <li><Link href='projects'><a><h3>PROJECTS</h3></a></Link></li>
                        </ul>
                    </nav>
                    <div className={styles.navbar}>
                        {!showMenu?
                        <Image
                            onClick={()=>{setShowMenu(!showMenu)}}
                            priority='high'
                            height={24}
                            width={24}
                            src={'/menu_white_24dp.svg'}
                            alt='nav button'/>:
                        <Image
                            onClick={()=>{setShowMenu(!showMenu)}}
                            priority='high'
                            height={24}
                            width={24}
                            src={'/closebtn.svg'}
                            alt='nav button'/>}
                    </div>
                    {showMenu?
                        <Menu/>:
                        <></>}
                </GridContainer>
            {children}
        </NavModeContext.Provider>
    )
}

export {
    NavContext,
    NavModeContext
}