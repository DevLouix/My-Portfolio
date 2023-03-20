import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const QuestionContainer = styled.div`
    height: max-content;
    width: max-content;
    padding: 7px;
`;

const SkillItems = styled.div`
    height: max-content;
    width: max-content;
    border-radius: 7px;
    background-color: aliceblue;
    padding: 7px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const SubmitButton = styled.button`
    height: max-content;
    width: max-content;
    border-radius: 5px;
    background-color: burlywood;
    padding: 10px;
    cursor: pointer;
`;
function HireMeForm() {
    const skills = [
        'Web Development',
        'App Development',
        'Software Develoment',
        '3D Animation',
        '3D Modelling',
        'Game Development'
    ];
    const [formState, setFormState] = useState(0);
    const [selections, setSelections] = useState([]);
    const [showBtn, setShowBtn] = useState(false);

    function formQuestion(state) {
        switch (state) {
            case 0:
                return <QuestionContainer>Hire Me For?</QuestionContainer>;
            case 1:
                return <QuestionContainer>Email Address?</QuestionContainer>;
            default:
                break;
        }
    }

    function formOptions(state) {
        switch (state) {
            case 0:
                return skills.map((skill) => {
                    return (
                        <SkillItems
                            onClick={() => {
                                setSelections((selection) => [...selection, skill]);
                                setShowBtn(true);
                            }}>
                            {skill}
                        </SkillItems>
                    );
                });
            case 1:
                return <TextField sx={{marginBottom: "10px"}} variant="outlined" label="Email Address" />;
            default:
                break;
        }
    }

    function handleSubmit(state) {
        state != 4 ? setFormState((prevState) => prevState + 1) : submit();
        function submit() {
            console.log(selections);
        }
    }

    return (
        <Container>
            {formQuestion(formState)}
            {formOptions(formState)}
            <SubmitButton
                onClick={() => {
                    handleSubmit(formState);
                }}>
                {showBtn ? (formState == 4 ? 'SUBMIT' : 'NEXT') : null}
            </SubmitButton>
        </Container>
    );
}

export default HireMeForm;
