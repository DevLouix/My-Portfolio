import React from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

function Menu() {
  return (
    <div className={styles.menu}>
        <ul className={`${styles.menu_navlinks}`}>
            <li><Link href='/'><a>HOME</a></Link></li>
            <li><Link href='blog'><a>BLOG</a></Link></li>
            <li><Link href='store'><a>STORE</a></Link></li>
            <li><Link href='projects'><a>PROJECTS</a></Link></li>
        </ul>
    </div>
  )
}

export default Menu