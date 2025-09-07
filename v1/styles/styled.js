import styled from 'styled-components';

export const StoreCategoryItemContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 50px;
    gap: 20px;
    justify-content: center;
    /* border: 1px solid bisque; */
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 700px) {
    padding: 0 20px;
    }
`;

export const FlexRow = ({ gap, children, cursor, onClick }) => {
    const Flex = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: ${gap};
        cursor: ${cursor};
    `;
    return <Flex onClick={onClick}>{children}</Flex>;
};

export const FlexColumn = ({ gap, children, cursor, onClick }) => {
    const Flex = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: ${gap};
        cursor: ${cursor};
    `;
    return <Flex onClick={onClick}>{children}</Flex>;
};
