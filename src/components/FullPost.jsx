import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from './Post';
import Comment from './Comment';

function FullPost() {
  const {id}=useParams();
  const [post,setPost]=useState({});
  const [comment,setComment]=useState([]);
  
  useEffect(()=>{
    getPost();
    getCommnet();
  },[])

  const getPost=async()=>{
    try {
      const {data}=await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      // console.log(data)
      setPost(data);
    } catch (error) {
      console.log(error)
    }
  }

  const getCommnet=async()=>{
    try {
      const {data}= await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      // console.log(data)
      setComment(data)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(comment)
  const comments=comment.map((el,index)=><Comment value={el} key={index}/>)
  // console.log(comments)
  return (
    <div className="container">
      <Post value={post}/>
      {comments}
    </div>
  )
}

export default FullPost
