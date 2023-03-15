import styles from '../Follow/index.module.scss'
import { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faGithubSquare} from "@fortawesome/free-brands-svg-icons"
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons"
import { ThemeModeContext } from '../../../context/ThemeContext'
import Image from 'next/image'


function index() {
    let {themeMode}=useContext(ThemeModeContext);

    console.log(themeMode)
    return (
        <div className={styles.container}>
            <h1>Follow</h1>
            <div className={styles.imageContainer}>
                {themeMode=='light'?<Image src={'https://cdn-icons-png.flaticon.com/128/174/174855.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>:<Image src={'https://cdn-icons-png.flaticon.com/128/2111/2111463.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>}                
                {themeMode=='light'?<Image src={'/twitter1.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>:<Image src={'/twitter2.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>}
                {themeMode=='light'?<Image src={'/linkedin1.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>:<Image src={'/linkedin2.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>}
                {themeMode=='light'?<Image src={'/youtube.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>:<Image src={'/youtube1.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>}
                {themeMode=='light'?<Image src={'/fb1.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>:<Image src={'/fb2.png'} height={24} width={24} alt='Follow Me Icon' priority='high'/>}
            </div>
        </div>
  )
}

export default index