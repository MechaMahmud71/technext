import React, { useState,useEffect } from 'react';
import Post from './Post';
import "../styles/Dashboard.css"
import { getPosts } from '../api/getPost';


function Dashboard() {
  
  const [posts,setPosts]=useState([]);
  const [visible,setVisible]=useState(10);
  
  const URL='https://jsonplaceholder.typicode.com/posts';
  
  useEffect(()=>{
    getAllPosts();
    
  },[])

  const getAllPosts=async()=>{
    const userPosts=await getPosts(URL);
    setPosts(userPosts);
  }
  
  const loadMore=()=>{
    setVisible((previousValue)=>previousValue+10)
  }

 

  const mappedPost=posts.slice(0,visible).map((el,index)=><Post value={el} key={index+1}/>)
  
  
  return (
    <div className="container">
      {mappedPost}
      <button className="btn-loadMore" onClick={loadMore}>Load More</button>
    </div>
  )
}

export default Dashboard
