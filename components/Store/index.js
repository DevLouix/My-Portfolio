import styles from '../Store/index.module.scss'
import React, { useContext, useEffect } from 'react'
import App from '../../database/Store/App'
import Game from '../../database/Store/Game'
import Software from '../../database/Store/Software'
import Detail from './Templates/Detail'
import { ShowDetail } from '../../context/StoreContext'


function index() {
    const {showDetail,DB_Details} = useContext(ShowDetail)
    console.log(DB_Details);

    useEffect(()=>{(function() {
        function scrollHorizontally(e) {
            e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            document.getElementById('store_container').scrollLeft -= (delta * 40); // Multiplied by 40
            e.preventDefault();
        }
        if (document.getElementById('store_container').addEventListener) {
            // IE9, Chrome, Safari, Opera
            document.getElementById('store_container').addEventListener('mousewheel', scrollHorizontally, false);
            // Firefox
            document.getElementById('store_container').addEventListener('DOMMouseScroll', scrollHorizontally, false);
        } else {
            // IE 6/7/8
            document.getElementById('store_container').attachEvent('onmousewheel', scrollHorizontally);
        }
    })();},[])

  return (
    <div>
        <center>
            <h1>STORE</h1>
            <div id='store_container' className={styles.container}>
                <div className={styles.app}>
                    <h1>Apps</h1>
                    {!showDetail?
                        <App/>:
                        <Detail title={DB_Details[2]}/>
                    }
                </div>
                <div className={styles.game}>
                    <h1>Games</h1>
                    {!showDetail?
                        <Game/>:
                        <Detail title={DB_Details[2]}/>
                    }
                </div>
                <div className={styles.software}>
                    <h1>Softwares</h1>
                    <Software/>
                </div>
            </div>
        </center>
    </div>
  )
}

export default index