import React, { useState,useEffect } from 'react';
import Post from './Post';
import "../styles/Dashboard.scss"
import { getPosts } from '../api/getPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard=()=> {
  
  const [posts,setPosts]=useState([]);
  const [visible,setVisible]=useState(10);
  
  const URL='https://jsonplaceholder.typicode.com/posts';
  
  useEffect(()=>{
    getAllPosts();
    
  },[])

  const getAllPosts=async()=>{
    try {
      const userPosts=await getPosts(URL);
      setPosts(userPosts);
    } catch (error) {
        toast.error("Sorry! Posts can not be fetched!")
    }
  }
  
  const loadMore=()=>{
    setVisible((previousValue)=>previousValue+10)
  }

 

  const mappedPost=posts.slice(0,visible).map((el,index)=><Post value={el} key={index+1}/>)
  
  
  return (
    <div className="dashboard">
      <ToastContainer/>
      <div className="container">
        {mappedPost}
        <button className="btn-loadMore" onClick={loadMore}>Load More</button>
      </div>
     
    </div>
  )
}

export default Dashboard
