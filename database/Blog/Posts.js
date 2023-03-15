import styles from '../Blog/BlogPosts.module.scss'
import React from 'react'

const Posts = ({id,timestamp,title,description}) => {
  console.log(title)
    let MAX_LENGTH = 250
  return (
    <div className={styles.postCard}>
        <h3 className={`${styles.postHead} ${'animate__animated animate__fadeInDown delay0_5'}`}>{title}</h3>
        <span className={`${styles.postDescription} ${'animate__animated animate__fadeInUpBig'}`}>{`${description.substring(0, MAX_LENGTH)}...`}<br></br></span>
        <span className={styles.postTime}>{timestamp=new Date().toLocaleDateString()}</span><br></br>
        <button className='btn1 animate__animated animate__zoomInDown'>READ MORE</button>
    </div>
  )
}

export default Posts