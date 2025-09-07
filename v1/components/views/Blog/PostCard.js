import React from 'react';
import styled from 'styled-components';

const PostCard = ({ id, timestamp, title, description, readPost }) => {
    console.log(title);
    let MAX_LENGTH = 250;

    const PostCardWrapper = styled.div`
        position: relative;
        padding: 30px;
        border-radius: 5px;
        background-color: rgb(65, 61, 61);
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 10px;
    `;
    const PostHead = styled.h3``;
    const PostDescription = styled.span`
        padding: 5px;
        opacity: 0.8;
        @media only screen and (max-width: 425px) {
            font-size: small;
        }
        @media only screen and (max-width: 360px) {
            font-size: 10px;
        }
    `;

    const PostTime = styled.span`
        padding: 5px;
    `;
    return (
        <PostCardWrapper>
            <PostHead className="animate__animated animate__fadeInDown delay0_5">{title}</PostHead>
            <PostDescription className="animate__animated animate__fadeInUpBig">
                {`${description.substring(0, MAX_LENGTH)}...`}
                <br></br>
            </PostDescription>
            <PostTime>
                {
                    (timestamp = new Date().toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }))
                }
            </PostTime>
            <br></br>
            <button className="btn1 animate__animated animate__zoomInDown" onClick={readPost}>READ MORE</button>
        </PostCardWrapper>
    );
};

export default PostCard;
