import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { postNewContract } from '../../../../pages/api/firebase/about';

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
    font-weight: bolder;
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

const MessageForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    const [selections, setSelections] = useState({
        skill: '',
        email: '',
        message: { messageSubject: '', messageBody: '' }
    });
    // useEffect(() => {
    //     setSelections(selections);
    //     console.log('Updated State', selections);
    // }, [selections]);
    const [showBtn, setShowBtn] = useState(false);
    const [skill, setSkill] = useState('');

    function formQuestion(state) {
        switch (state) {
            case 0:
                return <QuestionContainer>Hire Me For?</QuestionContainer>;
            case 1:
                return <QuestionContainer>Email Address?</QuestionContainer>;
            case 2:
                return <QuestionContainer>Message (if any)</QuestionContainer>;
            case 3:
                return <QuestionContainer>Thanks</QuestionContainer>;
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
                            key={skill}
                            onClick={() => {
                                setSkill(skill);
                                setShowBtn(true);
                            }}>
                            {skill}
                        </SkillItems>
                    );
                });
            case 1:
                return (
                    <TextField
                        onChange={(e) => {
                            setSelections({ ...selections, email: e.target.value });
                        }}
                        value={selections.email}
                        sx={{ marginBottom: '10px' }}
                        variant="outlined"
                        label="Email Address"
                        type="email"
                        required
                    />
                );
            case 2:
                return (
                    <MessageForm>
                        <TextField
                            onChange={(e) => {
                                setSelections({
                                    ...selections,
                                    message: {
                                        ...selections.message,
                                        messageSubject: e.target.value
                                    }
                                });
                            }}
                            value={selections.message.messageSubject}
                            sx={{ marginBottom: '10px' }}
                            variant="outlined"
                            label="Subject (Optional)"
                        />
                        <TextField
                            multiline
                            rows={5}
                            onChange={(e) => {
                                setSelections({
                                    ...selections,
                                    message: {
                                        ...selections.message,
                                        messageBody: e.target.value
                                    }
                                });
                            }}
                            value={selections.message.messageBody}
                            sx={{ marginBottom: '10px' }}
                            variant="outlined"
                            label="Message Body (Optional)"
                        />
                    </MessageForm>
                );
            default:
                break;
        }
    }

    function handleSubmit(state) {
        state != 3 ? setFormState((prevState) => prevState + 1) : null;
        if (state == 0) {
            skill != '' ? setSelections({ ...selections, skill: skill }) : null;
        }
        if (state == 1) {
        }
        if (state == 2) {
            submit();
        }

        async function submit() {
            setShowBtn(false);
            await postNewContract(selections)
            setFormState(3);
        }
    }

    useEffect(() => {
        selections.email == '' ? setShowBtn(false) : null;
        selections.email != '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selections.email) ? setShowBtn(true) : null;
    }, [selections]);

    return (
        <Container>
            {formQuestion(formState)}
            {formOptions(formState)}
            {showBtn ? (
                <SubmitButton
                    onClick={() => {
                        handleSubmit(formState);
                    }}>
                    {formState == 2 ? 'SUBMIT' : 'NEXT'}
                </SubmitButton>
            ) : null}
        </Container>
    );
}

export default HireMeForm;
