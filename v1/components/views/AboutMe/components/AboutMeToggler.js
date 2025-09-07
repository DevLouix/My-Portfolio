import React, { createContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
const AboutMeTogglerMode = createContext();

function AboutMeToggler({ children }) {
    let [aboutMeToggler, setAboutMeToggler] = useState(false);
    let [aboutMeMode, setAboutMeMode] = useState('Obsolete');

    function Toggle() {
        setAboutMeToggler((aboutMeToggler = !aboutMeToggler));
        if (aboutMeToggler) {
            setAboutMeMode('Active');
        } else {
            setAboutMeMode('Obsolete');
        }
    }

    const Button = styled.button`
        z-index: 99999;
        position: absolute;
        height: 30px;
        width: 100px;
        background-color: yellow;
        top: 40%;
        left: 0;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        opacity: 0.5;
        z-index: 1;
        cursor: pointer;
        transform-origin: 0% 100%;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg) translateX(-50%);
        :hover {
            opacity: 1;
        }
    `;

    return (
        <AboutMeTogglerMode.Provider value={{ aboutMeMode, setAboutMeMode }}>
            <Button onClick={Toggle}>
                <Link href="/about">About</Link>
            </Button>
            {children}
        </AboutMeTogglerMode.Provider>
    );
}

export { AboutMeToggler, AboutMeTogglerMode };
