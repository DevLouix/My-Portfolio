import styles from '../Store/index.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import Games from './Games';
import Softwares from './Softwares';
import Detail from './components/StoreItemInfo';
import { ShowDetail } from '../../../context/StoreContext';
import Apps from './Apps';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: block;
`;
const Container = styled.div`
    display: grid;
    grid-template-columns: 50vw 50vw 50vw;
    overflow-x: scroll;
    overflow-y: hidden;
    ::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }
    ::-webkit-scrollbar-button {
        width: 10px;
        background: #ccc;
    }
    ::-webkit-scrollbar-track-piece {
        background: #888;
    }
    ::-webkit-scrollbar-thumb {
        background: #eee;
    }
    @media (max-width: 550px) {
        grid-template-columns: 70vw 70vw 70vw;
    }
    /* ::-webkit-scrollbar {
        width: 50px;
    } */
    /* -ms-overflow-style: none; 
    ::-webkit-scrollbar {
        display: none;
    } */
    height: 73vh;
`;

const StoreCategoryContainer = styled.div`
    position: relative;
    border-right: 1px solid grey;
    gap: 20px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
    h1 {
        margin-bottom: 10px;
    }
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
function Index() {
    const { showDetail, setShowDetail, DB_Details, storeCategory } = useContext(ShowDetail);
    console.log(DB_Details);

    const [horizontalScrollState, setHorizontalScrollState] = useState(true);

    // useEffect(() => {
    //     (function () {
    //         const store_item_container = document.getElementById('store_item_container');
    //         function scrollVert(e) {
    //             setHorizontalScrollState(false);
    //             setTimeout(() => {
    //                 setHorizontalScrollState(true);
    //             }, 3000);
    //             e = window.event || e;
    //             var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    //             store_item_container.scrollBy(0, 100); // Multiplied by 40
    //             console.log('vert');
    //             e.preventDefault();
    //         }
    //         if (document.getElementById('store_item_container').addEventListener) {
    //             // IE9, Chrome, Safari, Opera
    //             document
    //                 .getElementById('store_item_container')
    //                 .addEventListener('mousewheel', scrollVert, false);
    //             // Firefox
    //             document
    //                 .getElementById('store_item_container')
    //                 .addEventListener('DOMMouseScroll', scrollVert, false);
    //         } else {
    //             // IE 6/7/8
    //             document
    //                 .getElementById('store_item_container')
    //                 .attachEvent('onmousewheel', scrollVert);
    //         }
    //     })();
    //     (function () {
    //         // Scroll horizontal effect function
    //         function scrollHorizontally(e) {
    //             horizontalScrollState
    //                 ? scroll(e)
    //                 : null
    //             function scroll(e) {
    //                 e = window.event || e;
    //                 var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    //                 document.getElementById('store_container').scrollLeft -= delta * 40; // Multiplied by 40
    //                 e.preventDefault();
    //             }
    //         }
    //         if (document.getElementById('store_container').addEventListener) {
    //             // IE9, Chrome, Safari, Opera
    //             document
    //                 .getElementById('store_container')
    //                 .addEventListener('mousewheel', scrollHorizontally, false);
    //             // Firefox
    //             document
    //                 .getElementById('store_container')
    //                 .addEventListener('DOMMouseScroll', scrollHorizontally, false);
    //         } else {
    //             // IE 6/7/8
    //             document
    //                 .getElementById('store_container')
    //                 .attachEvent('onmousewheel', scrollHorizontally);
    //         }
    //     })();
    // }, []);

    return (
        <Wrapper>
            <center>
                {/* This Aligns the texts to center */}
                <h1>STORE</h1>
                <Container id="store_container">
                    <StoreCategoryContainer>
                        <h1>Apps</h1>
                        <Flex>
                            {storeCategory == 0 && showDetail ? (
                                <Detail
                                    title={DB_Details[2]}
                                    imagelink={DB_Details[3]}
                                    description={DB_Details[4]}
                                    download_link={DB_Details[5]}
                                    back={setShowDetail}
                                />
                            ) : (
                                <Apps />
                            )}
                        </Flex>
                    </StoreCategoryContainer>
                    <StoreCategoryContainer>
                        <h1>Games</h1>
                        {storeCategory == 1 && showDetail ? (
                            <Detail
                                title={DB_Details[2]}
                                imagelink={DB_Details[3]}
                                description={DB_Details[4]}
                                download_link={DB_Details[5]}
                                back={setShowDetail}
                            />
                        ) : (
                            <Games />
                        )}
                    </StoreCategoryContainer>
                    <StoreCategoryContainer>
                        <h1>Softwares</h1>
                        {storeCategory == 2 && showDetail ? (
                            <Detail
                                title={DB_Details[2]}
                                imagelink={DB_Details[3]}
                                description={DB_Details[4]}
                                download_link={DB_Details[5]}
                                back={setShowDetail}
                            />
                        ) : (
                            <Softwares />
                        )}
                    </StoreCategoryContainer>
                </Container>
            </center>
        </Wrapper>
    );
}

export default Index;
