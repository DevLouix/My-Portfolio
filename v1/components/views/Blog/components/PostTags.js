import styles from '../index.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPostByTag, getTags } from '../../../../pages/api/blog';
import { LoadingMode } from '../../../../context/LoadingContext';

function PostTags({setPost}) {
    const {setLoading} = useContext(LoadingMode)
    const BlogTags = styled.div`
        ul {
            display: flex;
            flex-direction: row;
            gap: 10px;
            cursor: pointer;
        }
    `;

    useEffect(() => {
        posts();

        async function posts() {
            setLoading(true);
            setTags(await getTags());
            setLoading(false);
        }
    }, [0]);

    const [tags, setTags] = useState([]);

    return (
        <BlogTags className={styles.category}>
            {/* className="animate__animated animate__fadeInDown" */}
            <ul >
                {tags.map((tag, index) => {
                    return (
                        <li
                            key={index*5}
                            onClick={async () => {
                                setLoading(true)
                                const postByTag = await getPostByTag(tag);
                                setPost(postByTag);
                                setLoading(false)
                            }}>
                            <h3>{tag}</h3>
                        </li>
                    );
                })}
            </ul>
        </BlogTags>
    );
}

export default PostTags;
