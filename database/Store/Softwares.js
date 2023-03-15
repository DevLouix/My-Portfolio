import styles from './store.module.scss'
import React from 'react'

const Softwares = ({id,timestamp,title,imagelink}) => {
    
    return (
        <div className={styles.softwareCard}>
            <h3 className={styles.softwareTitle}>{title}</h3>
        </div>
    )
}

export default Softwares