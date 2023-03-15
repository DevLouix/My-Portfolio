import { collection,query,orderBy,onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react"
import Games from "./Games";
import styles from './store.module.scss'

const Game = () => {
    const [game,setGames] = useState([])

    useEffect(()=>{
        const collectionRef = collection(db,"Store/Games/games");
        const q = query(collectionRef, orderBy("timestamp",'desc'))
        
        const object = onSnapshot(q, (querySnapshot)=>{
            setGames(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, imagelink: doc.data().imagelink, timestamp: doc.data().timestamp?.toDate().getTime()})))
        })
        return object

    },[])
    return (
        <div className={styles.grid}>
            {game.map(game =>
            <Games
                key={game.id}
                title={game.title}
                timestamp={game.timestamp}
                imagelink={game.imagelink}
            />)}
        </div>
    )
}

export default Game