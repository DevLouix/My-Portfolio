import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeModeContext } from '../../context/ThemeContext';
import ThemeButton from '../ThemeButton';

function Index() {
    let { color, setColor } = useContext(ThemeModeContext);

    const FooterContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border-top: 1px solid grey; */
        div {
            display: flex;
            margin: 0 10px;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    `;

    const TextContent = styled.h6``;

    const ThemeBtn = styled.div`
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: inherit;
        height: inherit;
    `;

    return (
        <FooterContainer>
            <div>
                <TextContent>All Right Reserved 2023</TextContent>
                <ThemeBtn>
                    <ThemeButton />
                </ThemeBtn>
            </div>
        </FooterContainer>
    );
}

export default Index;
