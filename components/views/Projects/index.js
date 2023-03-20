import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../../pages/api/firebase/projects';
import styled from 'styled-components';

function Index() {
    const [projects, setProjects] = useState([]);


    const ProjectContainer = styled.div`
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        gap: 30px;
        width: 100vw;
        height: 80vh;
    `

    useEffect(() => {
        project();
        async function project(){
            await getProjects(projects,setProjects)
        }
    }, []);

    return (
        <div>
            <center>
                <ProjectContainer>
                    {projects.map((projects) => (
                        <ProjectCard
                            key={projects.id}
                            title={projects.title}
                            timestamp={projects.timestamp}
                            description={projects.description}
                            status={projects.status}
                        />
                    ))}
                </ProjectContainer>
            </center>
        </div>
    );
}

export default Index;
