import styles from '../Blog/BlogPosts.module.scss'
import React from 'react'

const Projects = ({id,timestamp,title,description}) => {
    console.log(title)
    return (
        <div className={styles.postCard}>
            <h3>{title}</h3>
            {timestamp}<br></br>
            <button>READ MORE</button>
        </div>
    )
}

export default Projects