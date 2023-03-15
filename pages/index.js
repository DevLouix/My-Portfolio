import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AboutMe from '../components/_LayoutComponents/AboutMe'
import Follow from '../components/_LayoutComponents/Follow'
import LayoutBody from '../components/LayoutViews'
import { NavContext } from '../components/NavBar'
import { AboutMeToggler } from '../components/_LayoutComponents/AboutMe/AboutMeToggler'
import HomePage from '../components/HomePage'
import Script from 'next/script'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dev Louix</title>
                <meta name="description" content="The Enthusiastic Developer DevLouix" />
                <link rel="icon" href="/favicon.svg" />
                <Script type='text/javascript' src='../../context/main.js' strategy='beforeInteractive'/>
            </Head>
                <AboutMeToggler>
                    {/* <AboutMe/> */}
                    <HomePage/>
                </AboutMeToggler>
        </div>
    )
}
