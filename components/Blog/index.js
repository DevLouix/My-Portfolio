import styles from '../Blog/index.module.scss'
import React,{useContext, useState} from 'react'
import { ThemeModeContext } from '../../context/ThemeContext';
import Image from 'next/image';
import Post from '../../database/Blog/Post';

function index() {
    let {themeMode} = useContext(ThemeModeContext);
    const [category,setCategory] = useState(false);
    console.log(themeMode)

    function styler(className,Context) {
        let style = className+Context
        console.log(style)
        return style
    }
    function toggleCategory() {
        if(!category){
            setCategory(true)
        }else{setCategory(false)}
    }
    return (
        <div className={styles.container}>
            <div className={styles.blogMenu}>
                <div className={styles.category}>
                    <div onClick={toggleCategory} className={styles.categoryWrapper}>
                        {!category?
                        <div className={`${styles.categoryBtn} ${'animate__animated animate__headShake'}`}>
                            <h5>Category</h5>
                            <Image src={'/category_white_24dp.svg'} alt='search' width={20} height={20}/>
                        </div>:
                            <Image className={styles.categoryClose} src={'/close_white_24dp (1).svg'} alt='search' width={20} height={20}/>}
                    </div>
                    {category?
                        <div className={styles.categoryMenu}>
                            <ul>
                                <li className='animate__animated animate__fadeInTopLeft'>Web Development</li>
                                <li className='animate__animated animate__fadeInTopLeft'>3D Software</li>
                                <li className='animate__animated animate__fadeInTopLeft'>Mobile App Development</li>
                            </ul>
                        </div>: 
                    <></>}
                </div>
                <div className={`${styles[styler("searchContainer",themeMode)]} ${styles.searchContainer}`}>
                    <input
                        type="text"
                        placeholder='search'
                        id="roll"
                        name="roll"
                        required
                        minLength="10"
                        maxLength="20"
                        className={styles.searchBar}
                    />
                    <div className={`${styles[styler("search",themeMode)]}`}>
                        {themeMode == "light"?<Image src={'/search_black_24dp.svg'} alt='search' width={24} height={24}/>:
                        <Image src={'/search_white_24dp.svg'} alt='search' width={24} height={24}/>}
                    </div>
                </div>
            </div>
            <div className={styles.postBody} >                
                <Post/>
            </div>
        </div>
    )
}

export default index