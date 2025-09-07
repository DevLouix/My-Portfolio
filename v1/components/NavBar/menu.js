import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';

function Menu({ showMenu }) {
    return (
        <div className={styles.menu}>
            <ul className={`${styles.menu_navlinks}`}>
                <li
                    onClick={() => {
                        showMenu(false);
                    }}>
                    <Link href="/">
                        <a>HOME</a>
                    </Link>
                </li>
                <li
                    onClick={() => {
                        showMenu(false);
                    }}>
                    <Link href="blog">
                        <a>BLOG</a>
                    </Link>
                </li>
                <li
                    onClick={() => {
                        showMenu(false);
                    }}>
                    <Link href="store">
                        <a>STORE</a>
                    </Link>
                </li>
                <li
                    onClick={() => {
                        showMenu(false);
                    }}>
                    <Link href="projects">
                        <a>PROJECTS</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
