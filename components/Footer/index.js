import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeModeContext } from '../../context/ThemeContext'
import ThemeButton from '../ThemeButton'

function index() {
    let {color,setColor} = useContext(ThemeModeContext);

    const Grid = styled.div`
        display: grid;
        grid-template-columns: 90vw 10vw;
        width: 100%;
        height: 50px;
        border-top: 1px solid grey;
    `

    const TextContent = styled.h6`
        display: flex;
        justify-content: center;
        align-items: center;
    `

    const ThemeBtn = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: inherit;
        height: inherit;
    `

    return (
        <Grid>
            <TextContent>All Right Reserved 2022</TextContent>
            <ThemeBtn>
                <ThemeButton/>
            </ThemeBtn>
        </Grid>
    )
}

export default index