import styles from '../Templates/index.module.scss'
import React from 'react'


function Detail(props) {
    console.log(props.title)

    return (
        <div className={styles.detail_container}>
            <h1>{props.title}</h1>
        </div>
    )
}

export default Detail