import styles from '../index.module.scss'
import React, { useContext } from 'react';
import Image from 'next/image';
import { ThemeModeContext } from '../../../../context/ThemeContext';
import { LoadingMode } from '../../../../context/LoadingContext';
import { searchPosts } from '../../../../pages/api/blog';

function SearchBar({setPost}) {
    const [searchData, setSearchData] = React.useState('');
    let { themeMode } = useContext(ThemeModeContext);
    const {setLoading} = useContext(LoadingMode)

    
    function styler(className, Context) {
        let style = className + Context;
        console.log(style);
        return style;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (searchData != '') {
            setLoading(true);
            fetchPost(searchData);
            async function fetchPost(searchData) {
                const post = await searchPosts(searchData);

                setPost(post);
                setLoading(false);
            }
        }
        console.log(searchData);
    }

    return (
        <form
            noValidate
            onSubmit={(e) => {
                handleSubmit(e);
            }}
            className={`${styles[styler('searchContainer', themeMode)]} ${styles.searchContainer}`}>
            <input
                type="text"
                placeholder="search"
                id="roll"
                name="roll"
                required
                minLength="5"
                maxLength="20"
                className={styles.searchBar}
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
            />
            <div className={`${styles[styler('search', themeMode)]}`} onClick={(e)=>{handleSubmit(e)}}>
                {themeMode == 'light' ? (
                    <Image src={'/search_black_24dp.svg'} alt="search" width={24} height={24} />
                ) : (
                    <Image src={'/search_white_24dp.svg'} alt="search" width={24} height={24} />
                )}
            </div>
        </form>
    );
}

export default SearchBar;
