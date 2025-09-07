import { Button } from '@mui/joy';
import * as React from 'react';
import styled from 'styled-components';

export default function ProjectInfo({ title, imagelink, description, contribution_link, status }) {
    const Container = styled.div`
        height: max-content;
        width: max-content;
        max-width: 60vw;
        padding: 20px;
        /* border: 1px solid black;
        border-radius: 10px; */
    `;

    const OverviewLayout = styled.div`
        margin: 0 10px 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        gap: 20px;
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

    return (
        <Container>
            <OverviewLayout>
                <ItemCard>
                    <img src={imagelink} alt="store_item_image" />
                    <h4>{title}</h4>
                </ItemCard>
                <div>
                    <h6>{status}</h6>
                    <Button
                        onClick={() => {
                            window.open(`${contribution_link} status`, '_blank').focus();
                        }}
                        sx={{
                            backgroundColor: 'skyblue',
                            height: 'max-content',
                            width: 'max-content',
                            padding: '10px',
                            color: 'white',
                            borderRadius: '25px'
                        }}>
                        Contribute
                    </Button>
                </div>
            </OverviewLayout>
            <DescriptionLayout>
                <h1>About</h1>
                <div>{description ? description : 'No Content!'}</div>
            </DescriptionLayout>
        </Container>
    );
}
