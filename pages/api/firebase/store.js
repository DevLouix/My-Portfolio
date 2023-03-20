import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from './config';

function getProjects() {
    const collectionRef = collection(db, 'Projects');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    const projects = onSnapshot(q, (querySnapshot) => {
        setProjects(
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                description: doc.data().description,
                timestamp: doc.data().timestamp?.toDate().getTime()
            }))
        );
    });
    return projects;
}

export async function getGames(games, setGames) {
    const collectionRef = collection(db, 'Store/Games/games');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (querySnapshot) => {
        setGames(
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                imagelink: doc.data().imagelink,
                description: doc.data().description,
                download_link: doc.data().download_link,
                timestamp: doc.data().timestamp?.toDate().getTime()
            }))
        );
    });

    setGames(games);
    console.log(games);
}

export async function getApps(apps, setApps) {
    const collectionRef = collection(db, 'Store/Apps/apps');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (querySnapshot) => {
        setApps(
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                imagelink: doc.data().imagelink,
                description: doc.data().description,
                download_link: doc.data().download_link,
                timestamp: doc.data().timestamp?.toDate().getTime()
            }))
        );
    });

    setApps(apps);
    console.log(apps);
}

// export async function getMoreApps(currentAppName, moreApps, setMoreApps) {
//     const appRef = collection(db, 'Store/Games/games');
//     const q = query(appRef, where("title", "!= ", currentAppName));

//     onSnapshot(q, (querySnapshot) => {
//         moreApps.push(
//             querySnapshot.docs.map((doc) => ({
//                 ...doc.data(),
//                 id: doc.id,
//                 imagelink: doc.data().imagelink,
//                 description: doc.data().description,
//                 download_link: doc.data().download_link,
//                 timestamp: doc.data().timestamp?.toDate().getTime()
//             }))
//         );
//     });

//     setMoreApps(moreApps);
//     console.log(moreApps, "from app more");
// }

export async function getSoftwares(softwares, setSoftwares) {
    const collectionRef = collection(db, 'Store/moreApps/apps');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (querySnapshot) => {
        setSoftwares(
            querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                imagelink: doc.data().imagelink,
                description: doc.data().description,
                download_link: doc.data().download_link,
                timestamp: doc.data().timestamp?.toDate().getTime()
            }))
        );
    });

    setSoftwares(softwares);
    console.log(softwares);
}
