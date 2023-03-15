import React from 'react'
import styled from 'styled-components'
import {NavContext} from '../NavBar'
import Footer from '../Footer'
import {AboutMeToggler} from '../_LayoutComponents/AboutMe/AboutMeToggler'
import { ThemeContext } from '../../context/ThemeContext'

function index({children}) {
    return (
      <>
            <ThemeContext>
                <NavContext/>
                <AboutMeToggler/>
                {children}
                <Footer/>
            </ThemeContext>
      </>
    )

}
export default index