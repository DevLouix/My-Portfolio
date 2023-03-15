import styles from './store.module.scss'
import React from 'react'

const Games = ({id,timestamp,title,imagelimk}) => {
    
    return (
        <div className={styles.gameCard}>
            <h3 className={styles.gameTitle}>{title}</h3>
        </div>
    )
}

export default Games