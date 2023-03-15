import styles from './store.module.scss'
import React, { useContext, useState } from 'react'
import { ShowDetail } from '../../context/StoreContext'

const Apps = ({ id, timestamp, title, imagelink }) => {
    const {showDetail,setShowDetail,setDB_Details} = useContext(ShowDetail)
    
    function show() {
        setShowDetail(!showDetail)
        setDB_Details([id,timestamp,title,imagelink])
    }

    return (
        <div onClick={()=>{show()}} className={styles.appCard}>
            <h3>{title}</h3>
        </div>
    )
}

export default Apps