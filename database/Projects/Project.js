import { collection,query,orderBy,onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react"
import Projects from "./Projects";

const Project = () => {
    const [projects,setProjects] = useState([])
    console.log(projects);

    useEffect(()=>{
        const collectionRef = collection(db,"Projects");
        const q = query(collectionRef, orderBy("timestamp",'desc'))
        
        const projects = onSnapshot(q, (querySnapshot)=>{
            setProjects(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, description: doc.data().description, timestamp: doc.data().timestamp?.toDate().getTime()})))
        })
        return projects
    },[])
    return (
        <div >
            {projects.map(projects =>
            <Projects
                key={projects.id}
                title={projects.title}
                timestamp={projects.timestamp}
                description={projects.description}
            />)}
        </div>
    )
}

export default Project