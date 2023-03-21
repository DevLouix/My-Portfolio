import axios from 'axios';

const url = "https://blog.devlouix.com/api/v1/posts";

console.log(url);

export async function getPosts() {
    const res = await axios(`${url}/api/v1/posts`);
    const data = await res.data;

    let posts = data;

    return posts;
}

export async function getPostByTag(tag) {
    // I use this function to get all posts the difference
    // occurs in the func param ie i specify required route in the param
    const res = await axios.get(`${url}/api/v1/posts/${tag}`);
    const data = await res.data;

    let posts = data;

    return posts;
}

export async function searchPosts(searchData) {
    // I use this function to get all posts the difference
    // occurs in the func param ie i specify required route in the param
    const res = await axios.get(`${url}/api/v1/posts/search?query=${searchData}`);
    const data = await res.data;

    let posts = data;

    return posts;
}

export async function getTags(){
    const res = await axios.get(`${url}/api/v1/posts/tags`)
    const data = await res.data

    let tags = data
    
    return tags
}
