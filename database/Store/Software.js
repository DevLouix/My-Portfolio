import { collection,query,orderBy,onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react"
import Softwares from "./Softwares";
import styles from './store.module.scss'

const Software = () => {
    const [software,setSoftware] = useState([])

    useEffect(()=>{
        const collectionRef = collection(db,"Store/Games/games");
        const q = query(collectionRef, orderBy("timestamp",'desc'))
        
        const object = onSnapshot(q, (querySnapshot)=>{
            setSoftware(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, imagelink: doc.data().imagelink, timestamp: doc.data().timestamp?.toDate().getTime()})))
        })
        return object

    },[])
    return (
        <div className={styles.grid}>
            {software.map(game =>
            <Softwares
                key={software.id}
                title={software.title}
                timestamp={software.timestamp}
                imagelink={software.imagelink}
            />)}
        </div>
    )
}

export default Software