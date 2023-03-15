import { collection,query,orderBy,onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react"
import Apps from "./Apps";
import styles from './store.module.scss'

const App = () => {
    const [app,setApp] = useState([])

    useEffect(()=>{
        const collectionRef = collection(db,"Store/Apps/apps");
        const q = query(collectionRef, orderBy("timestamp",'desc'))
        
        const posts = onSnapshot(q, (querySnapshot)=>{
            setApp(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, imagelink: doc.data().imagelink, timestamp: doc.data().timestamp?.toDate().getTime()})))
        })
        return posts

    },[])

    return (
        <div className={styles.grid}>
            {app.map(app =>
            <Apps
                key={app.id}
                title={app.title}
                timestamp={app.timestamp}
                imagelink={app.imagelink}
            />)}
        </div>
    )
}

export default App