import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from './Post';
import Comment from './Comment';
import {getPost} from "../api/getPost";

function FullPost() {
  const {id}=useParams();
  const [post,setPost]=useState({});
  const [comment,setComment]=useState([]);
  
  useEffect(()=>{
    getSinglePost();
    getCommnet();
  },[])

  const getSinglePost=async()=>{
    const singlePost=await getPost(id);
    setPost(singlePost);
  }

  const getCommnet=async()=>{
    try {
      const {data}= await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      
      setComment(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const comments=comment.map((el,index)=><Comment value={el} key={index}/>)
  
  return (
    <div className="container">
      <Post value={post}/>
      {comments}
    </div>
  )
}

export default FullPost
