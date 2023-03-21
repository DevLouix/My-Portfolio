import styles from '../NavBar/index.module.scss';
import styled from 'styled-components';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Menu from './menu';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LoadingMode } from '../../context/LoadingContext';
import { LinearProgress } from '@mui/material';
import { ThemeModeContext } from '../../context/ThemeContext';
import {
    Close,
    MenuRounded
} from '@mui/icons-material';
const NavModeContext = createContext();

const GridContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 9999;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;
const Logo = styled.div`
    z-index: 9999;
    padding-top: 10px;
    padding-left: 30px;
    cursor: pointer;
`;

function NavContext({ children }) {
    let [showMenu, setShowMenu] = useState(false);
    const { loading, setLoading } = useContext(LoadingMode);
    const router = useRouter();
    let { themeMode } = useContext(ThemeModeContext);

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            setLoading(true);
        });
        router.events.on('routeChangeComplete', () => {
            setLoading(false);
        });
    }, [router]);

    return (
        <NavModeContext.Provider value={{ showMenu, setShowMenu }}>
            <GridContainer className="theme_mode_background">
                <Logo
                    onClick={() => {
                        router.push('/');
                    }}>
                    <h1 className={`${styles.logo} animate__animated animate__fadeIn`}>
                        Dev <span className="animate__animated animate__backInRight">Louix</span>
                    </h1>
                </Logo>
                <nav className={styles.navlinks_container}>
                    <ul className={`${styles.navlinks}`}>
                        <li>
                            <Link href="/">
                                <a>
                                    <h3>HOME</h3>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="blog">
                                <a>
                                    <h3>BLOG</h3>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="store">
                                <a>
                                    <h3>STORE</h3>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="projects">
                                <a>
                                    <h3>PROJECTS</h3>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.navbar}>
                    {!showMenu ? (
                        <MenuRounded
                            onClick={() => {
                                setShowMenu(!showMenu);
                            }}
                        />
                    ) : (
                        <div
                            onClick={() => {
                                setShowMenu(!showMenu);
                            }}>
                            <Close />
                        </div>
                    )}
                </div>
                {showMenu ? <Menu showMenu={setShowMenu} /> : <></>}
            </GridContainer>
            <div>{loading ? <LinearProgress /> : null}</div>
            {children}
        </NavModeContext.Provider>
    );
}

export { NavContext, NavModeContext };
