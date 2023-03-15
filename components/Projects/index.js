import styles from './index.module.scss'
import React from 'react'
import Project from '../../database/Projects/Project'

function index() {
  return (
    <div>
        <center>
            <h1>NO Projects</h1>
            <div className={styles.kkk}>
              <Project/>
            </div>
        </center>
    </div>
  )
}

export default index