import styles from '../Blog/index.module.scss';
import React, { useContext, useState, useEffect } from 'react';
import { ThemeModeContext } from '../../../context/ThemeContext';
import styled from 'styled-components';
import { getPosts, getTags, } from '../../../pages/api/blog';
import PostCard from './PostCard';
import { LoadingMode } from '../../../context/LoadingContext';
import SearchBar from './components/SearchBar';
import PostTags from './components/PostTags';

function Index() {
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


    const [post, setPost] = useState([]);
    const { setLoading } = useContext(LoadingMode);
    // console.log(post);

    useEffect(() => {
        posts();

        async function posts() {
            setLoading(true);
            const postData = await getPosts();
            postData.slice(0, 20);
            setPost(postData);
            setLoading(false);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.blogMenu}>
                <PostTags setPost={setPost}/>
                <SearchBar setPost={setPost} />
            </div>
            <div className={styles.postBody}>
                <PostGrid>
                    {' '}
                    {/*className="animate__fadeInUpBig animate__animated"*/}
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
