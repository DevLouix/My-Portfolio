import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from './config';

export async function getProjects(project, setProjects) {
    const collectionRef = collection(db, 'Projects');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (querySnapshot) => {
        setProjects(
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                imagelink: doc.data().imagelink,
                description: doc.data().description,
                status: doc.data().status,
                contribution_link: doc.data().contribution_link,
                timestamp: doc.data().timestamp?.toDate().getTime()
            }))
        );
    });

    setProjects(project);
    console.log(project);
}