import React from 'react'
import styled from 'styled-components'
import {NavContext} from '../NavBar'
import Footer from '../Footer'
import { ThemeContext } from '../../context/ThemeContext'
import { AboutMeToggler } from '../views/AboutMe/components/AboutMeToggler'

function Index({children}) {
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
export default Index