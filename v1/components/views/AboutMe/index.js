import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import styled from 'styled-components';
import Image from 'next/image';
import { ThemeModeContext } from '../../../context/ThemeContext';
import { AboutMeTogglerMode } from './components/AboutMeToggler';
import { useRouter } from 'next/router';
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import HireMeForm from './components/HireMeForm';

const Container = styled.div`
    /* background-color: black; */
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
`;

function styler(className, Context) {
    let style = className + Context;
    return style;
}

function Index() {
    let { themeMode } = useContext(ThemeModeContext);
    let { aboutMeMode } = useContext(AboutMeTogglerMode);
    const [open, setOpen] = React.useState(false);
    const [anim, setAnim] = useState(false);

    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            aboutMeMode ? setAnim(!anim) : setAnim(anim);
        });
        router.events.on('routeChangeComplete', () => {
            setAnim(false);
        });
    }, [router.events]);

    const ConnectImageContainer = styled.div`
        display: flex;
        gap: 10px;
    `;

    return (
        <Container>
            <div className={styles.aboutMeMain}>
                <Image
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=455&q=80"
                    height={100}
                    width={100}
                    alt="Developer Image"
                    className={`${styles.profileImage} ${
                        !anim
                            ? 'animate__animated animate__rotateInUpRight delay0.5'
                            : ' animate__animated animate__hinge'
                    }`}
                />
                <div className={`${styles[styler('aboutMeTextZone', themeMode)]}`}>
                        <h3
                            className={`${styles.description} ${
                                !anim
                                    ? 'animate__animated animate__fadeInUp delay1'
                                    : 'animate__animated  animate__hinge'
                            }`}>
                            My name is <b>Dev Louix</b>
                            <br></br>I am a Full Stack Software Developer, 3D Modeller <br></br>
                            and Animator.
                        </h3>
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className={`${styles.button} ${
                            !anim
                                ? 'animate__animated delay1_5 animate__fadeInDown'
                                : 'animate__animated animate__hinge '
                        }`}>
                        Hire Me
                    </button>
                </div>
            </div>
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
                    <HireMeForm />
                </ModalDialog>
            </Modal>
            <div>
                <h1
                    className={` ${
                        !anim
                            ? 'animate__animated animate__rotateInUpRight delay0.5'
                            : ' animate__animated animate__hinge'
                    }`}>
                    ....connect
                </h1>
                <ConnectImageContainer>
                    {themeMode == 'light' ? (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'https://cdn-icons-png.flaticon.com/128/174/174855.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    ) : (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'https://cdn-icons-png.flaticon.com/128/2111/2111463.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    )}
                    {themeMode == 'light' ? (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/twitter1.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    ) : (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/twitter2.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    )}
                    {themeMode == 'light' ? (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/linkedin1.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    ) : (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/linkedin2.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    )}
                    {themeMode == 'light' ? (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/youtube.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    ) : (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/youtube1.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    )}
                    {themeMode == 'light' ? (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/fb1.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    ) : (
                        <Image
                            className={` ${
                                !anim
                                    ? 'animate__animated delay1_5 animate__fadeInDown'
                                    : 'animate__animated animate__hinge '
                            }`}
                            src={'/fb2.png'}
                            height={24}
                            width={24}
                            alt="Follow Me Icon"
                            priority="high"
                        />
                    )}
                </ConnectImageContainer>
            </div>
        </Container>
    );
}

export default Index;
