import { useContext, useEffect, useState } from 'react'
import styles from '../AboutMe/index.module.scss'
import styled from 'styled-components'
import Image from 'next/image'
import { ThemeModeContext } from '../../../context/ThemeContext'
import { AboutMeTogglerMode } from './AboutMeToggler'
import { useRouter } from 'next/router'

const Container = styled.div`
    /* background-color: black; */
    /* position: absolute; */
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    height: 100vh;
    width: 100%;
`

function styler(className, Context) {
    let style = className + Context
    return style
}
function HireMe() {
    
}

function index() {
    let { themeMode } = useContext(ThemeModeContext);
    let { aboutMeMode } = useContext(AboutMeTogglerMode)
    const [anim, setAnim] = useState(false)

    const router = useRouter()

    

    useEffect(() => {
        router.events.on('routeChangeStart',()=>{       
            aboutMeMode ? setAnim(!anim) : setAnim(anim)
        })
        router.events.on('routeChangeComplete',()=>{       
            setAnim(false)
        })
    }, [router.events])

    return (
        <Container>
            <div className={styles.aboutMeMain}>
                <Image
                    src='https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=455&q=80'
                    height={100}
                    width={100}
                    alt='Developer Image'
                    className={`${styles.profileImage} ${!anim?'animate__animated animate__rotateInUpRight delay0.5': ' animate__animated animate__hinge'}`} />
                <div className={`${styles[styler("aboutMeTextZone", themeMode)]}`}>
                    <h3 className={`${styles.description} ${!anim?'animate__animated animate__fadeInUp delay1':'animate__animated  animate__hinge'}`}>My name is <b>Ani Chinonso Bonaventure Louix</b><br></br>
                        I am a full stack Developer</h3>
                    <button onClick={()=>{HireMe()}} className={`${styles.button} ${!anim?'animate__animated delay1_5 animate__fadeInDown':'animate__animated animate__hinge '}`}>Hire Me</button>
                </div>
            </div>
        </Container>
    )
}

export default index