import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import {getPost} from "../api/getPost";

const AddPost = () => {
  
  const {id}=useParams();
  const [post,setPost]=useState({});
  const [formData,setFormData]=useState({
    id:0,
    title:"",
    body:"",
    userId:2
  })
  
  const { title,body  } = formData;


  const handelChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })

  }
  
  useEffect(()=>{
    if(id){
      getSinglePost();
    }
  },[id])

  const getSinglePost=async()=>{
    const singlePost=await getPost(id);
    
    setPost(singlePost);
    setFormData({
      id:singlePost.id,
      title:singlePost.title,
      body:singlePost.body,
      userId:2
    })
  }

  const submitPost=async()=>{
    try {
      const {data}= await axios.post('https://jsonplaceholder.typicode.com/posts',formData);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  const editPost=async()=>{
    try {
      const {data}= await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,formData);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <textarea name="title" cols="30" rows="10" onChange={handelChange} value={title}></textarea>
      <textarea name="body" cols="30" rows="10"onChange={handelChange} value={body}></textarea>
      {id?(
        <button className="btn-sumbit-post" onClick={editPost}>Edit Post</button>
      ):(
        <button className="btn-sumbit-post" onClick={submitPost}>Add Post</button>
      )}
    </div>
  )
}

export default AddPost
