import React from 'react';
import styled from 'styled-components';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ProjectInfo from './ProjectInfo';
import { ModalClose, Sheet } from '@mui/joy';

const ProjectCard = ({ timestamp, title, imagelink, description, status }) => {
    const ProjectCardContainer = styled.div`
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
        justify-content: center;
        gap: 10px;
        h3 {
            padding-bottom: 10px;
            color: grey;
            text-align: center;
        }
        h6{
            
        }
    `;

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <ProjectCardContainer onClick={() => setOpen(true)}>
                <h3>{title}</h3>
                <h6>{status}</h6>
            </ProjectCardContainer>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ModalClose />
                    <ProjectInfo imagelink={imagelink} status={status} description={description} />
                </ModalDialog>
            </Modal>
        </>
    );
};

export default ProjectCard;
