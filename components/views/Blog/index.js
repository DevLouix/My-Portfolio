import styles from '../Blog/index.module.scss';
import React, { useContext, useState, useEffect } from 'react';
import { ThemeModeContext } from '../../../context/ThemeContext';
import Image from 'next/image';
import styled from 'styled-components';
import { getPostByTag, getPosts, getTags, searchPosts } from '../../../pages/api/blog';
import PostCard from './PostCard';

function Index() {
    let { themeMode } = useContext(ThemeModeContext);
    const [category, setCategory] = useState(false);
    console.log(themeMode);

    function styler(className, Context) {
        let style = className + Context;
        console.log(style);
        return style;
    }

    const BlogTags = styled.div`
        ul {
            display: flex;
            flex-direction: row;
            gap: 10px;
            cursor: pointer;
        }
    `;

    const PostGrid = styled.div`
        display: grid;
        grid-template-columns: 50% 50%;
        @media only screen and (max-width: 750px) {
            display: flex;
            flex-direction: column;
        }
        :hover {
            cursor: pointer;
            box-shadow: rgba(71, 68, 68, 0.35) 0px 5px 15px;
        }
    `;

    const [tags, setTags] = useState([]);

    const [post, setPost] = useState([]);
    // console.log(post);

    useEffect(() => {
        posts();

        async function posts() {
            setTags(await getTags());
            const postData = await getPosts();
            postData.slice(0, 20);
            setPost(postData);
        }
    }, []);

    const [searchData, setSearchData] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        if (searchData != '') {
            fetchPost(searchData);
            async function fetchPost(searchData) {
                const post = await searchPosts(searchData);

                setPost(post);
                // setLoading(false);
            }
        }
        console.log(searchData);
    }
    return (
        <div className={styles.container}>
            <div className={styles.blogMenu}>
                <BlogTags className={styles.category}>
                    {/* //className="animate__animated animate__fadeInTopLeft" */}
                    <ul>
                        {tags.map((tag, index) => {
                            return (
                                <li
                                    key={tag}
                                    onClick={async () => {
                                        const postByTag = await getPostByTag(tag);
                                        setPost(postByTag);
                                    }}>
                                    <h3>{tag}</h3>
                                </li>
                            );
                        })}
                    </ul>
                </BlogTags>
                <form
                    noValidate
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    className={`${styles[styler('searchContainer', themeMode)]} ${
                        styles.searchContainer
                    }`}>
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
                    <div className={`${styles[styler('search', themeMode)]}`}>
                        {themeMode == 'light' ? (
                            <Image
                                src={'/search_black_24dp.svg'}
                                alt="search"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <Image
                                src={'/search_white_24dp.svg'}
                                alt="search"
                                width={24}
                                height={24}
                            />
                        )}
                    </div>
                </form>
            </div>
            <div className={styles.postBody}>
                <PostGrid className="animate__fadeInUpBig animate__animated">
                    {post.err ? (
                        <h1>{post.err}</h1>
                    ) : (
                        post.map((post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                timestamp={post.created_at}
                                description={post.body}
                            />
                        ))
                    )}
                </PostGrid>
            </div>
        </div>
    );
}

export default Index;
