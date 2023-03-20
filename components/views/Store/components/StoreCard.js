import React, { useContext } from 'react';
import styled from 'styled-components';
import { ShowDetail } from '../../../../context/StoreContext';

function StoreCard({ id, timestamp, title, imagelink, description, download_link, storeCategory }) {
    const { showDetail, setShowDetail, DB_Details, setDB_Details, setStoreCategory } =
        useContext(ShowDetail);

    function show() {
        setShowDetail(true);
        setStoreCategory(storeCategory);
        setDB_Details([id, timestamp, title, imagelink, description, download_link]);
    }

    const Container = styled.div`
        cursor: pointer;
        height: 130px;
        width: 90px;
        border-radius: 7px;
        margin-bottom: 10px;
        font-size: 1vw;
        background-color: rgb(138, 32, 138);
        background-image: url(${imagelink});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        overflow: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        ::-webkit-scrollbar {
            display: none;
        }
        /* using flex to position the title down */
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        h3 {
            padding-bottom: 10px;
            color: grey;
        }
    `;

    return (
        <Container
            onClick={() => {
                show();
            }}>
            <h3>{title}</h3>
        </Container>
    );
}

export default StoreCard;
