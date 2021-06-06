import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from './Post';
import Comment from './Comment';
import {getPost} from "../api/getPost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullPost=()=> {
  const {id}=useParams();
  const [post,setPost]=useState({});
  const [comment,setComment]=useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    getSinglePost(id);
    getCommnet(id);
  },[id])

  const getSinglePost=async(id)=>{
    const singlePost=await getPost(id);
    setLoading(false);
    setPost(singlePost);
  }

  const getCommnet=async(id)=>{
    try {
      const {data}= await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      setComment(data);
      setLoading(false);
    } catch (error) {
      toast.error("Sorry! Comments can not be fetched!")
    }
  }
  
  const comments=comment.map((el,index)=><Comment value={el} key={index}/>)

  if(loading){
    return(
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    )
  }
  
  return (
    <div className="container">
      <ToastContainer style={{fontSize:"1.5rem"}}/>
      <Post fullPost={true} value={post}/>
      <h1 className="comment-heading">Comments</h1>
      {comments}
    </div>
  )
}

export default FullPost;