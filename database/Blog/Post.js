import { collection,query,orderBy,onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react"
import styles from '../Blog/BlogPosts.module.scss'
import Post from "./Posts";

const BlogPosts = () => {
    const [post,setPost] = useState([])
    console.log(post);

    useEffect(()=>{
        const collectionRef = collection(db,"Blog");
        const q = query(collectionRef, orderBy("timestamp",'desc'))
        
        const posts = onSnapshot(q, (querySnapshot)=>{
            setPost(querySnapshot.docs.map(doc =>({...doc.data(), id: doc.id, description: doc.data().description, timestamp: doc.data().timestamp?.toDate().getTime()})))
        })
        return posts
    },[])
    return (
        <div  className={`${styles.post_grid} ${'animate__fadeInUpBig animate__animated'}`}>
            {post.map(post =>
            <Post 
                key={post.id}
                title={post.title}
                timestamp={post.timestamp}
                description={post.description}
            />)}
        </div>
    )
}

export default BlogPosts