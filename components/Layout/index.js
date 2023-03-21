import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavContext } from '../NavBar';
import Footer from '../Footer';
import { ThemeContext } from '../../context/ThemeContext';
import { AboutMeToggler } from '../views/AboutMe/components/AboutMeToggler';
import { LinearProgress } from '@mui/material';
import { LoadingContext, LoadingMode } from '../../context/LoadingContext';

function Index({ children }) {
    let { loading } = useContext(LoadingMode);

    return (
        <>
            <ThemeContext>
                <LoadingContext />
                <NavContext />
                <AboutMeToggler />
                {children}
                <Footer />
            </ThemeContext>
        </>
    );
}
export default Index;
