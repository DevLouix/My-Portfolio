import React, { useEffect, useState } from 'react';
import { ArrowLeft } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';
import { FlexRow, StoreCategoryItemContainer } from '../../../../styles/styled';
// import { getMoreApps } from '../../../../pages/api/firebase/store';

function StoreItemInfo({ title, imagelink, description, download_link, back }) {
    console.log(title);

    const Absolute = styled.div`
        position: absolute;
    `;

    const Container = styled.div`
        width: 50vw;
        height: 100%;
        /* border: 1px solid white; */
        /* background-color: black; */
    `;

    const OverviewLayout = styled.div`
        margin: 0 10px 0 10px;
        /* background-color: red; */
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        @media (max-width: 550px) {
            display: flex;
            gap: 20px;
            flex-flow: row wrap;
            align-items: center;
        }
        /* display: grid;
        grid-template-columns: 70% 30%; */
    `;
    const ItemCard = styled.div`
        background-color: indigo;
        display: flex;
        width: max-content;
        padding: 10px;
        margin-left: 10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            height: 130px;
            width: 90px;
        }
    `;

    const DescriptionLayout = styled.div`
        margin: 0 10px 0 10px;
        h1 {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 0 0 0 10px;
        }
        div {
            display: flex;
            justify-content: flex-start;
        }
    `;

    const MoreApps = styled.div``;

    const [more, setMore] = useState([]);

    // useEffect(()=>{
    //     more();
    //     async function more() {
    //         await getMoreApps(title,more,setMore)
    //     }
    // },[])

    return (
        <Container>
            <Absolute>
                <FlexRow
                    gap="10px"
                    cursor="pointer"
                    onClick={() => {
                        back(false);
                    }}>
                    <ArrowLeft />
                    back
                </FlexRow>
            </Absolute>
            <OverviewLayout>
                <ItemCard>
                    <img src={imagelink} alt="store_item_image" />
                    <h4>{title}</h4>
                </ItemCard>
                <Button
                    onClick={() => {
                        window.open(`${download_link}`, '_blank').focus();
                    }}
                    sx={{
                        backgroundColor: 'skyblue',
                        height: 'max-content',
                        width: 'max-content',
                        padding: '10px',
                        color: 'white',
                        borderRadius: '25px'
                    }}>
                    Download
                </Button>
            </OverviewLayout>
            <DescriptionLayout>
                <h1>About</h1>
                <div>{description ? description : 'No Content!'}</div>
            </DescriptionLayout>
            <MoreApps>
                <h1>Similar Apps</h1>
                {/* <StoreCategoryItemContainer>
                    {more.map((more) => (
                        <StoreCard
                            storeCategory={0}
                            key={more.id}
                            title={more.title}
                            timestamp={more.timestamp}
                            imagelink={more.imagelink}
                            description={more.description}
                            download_link={more.download_link}
                        />
                    ))}
                </StoreCategoryItemContainer> */}
            </MoreApps>
        </Container>
    );
}

export default StoreItemInfo;
