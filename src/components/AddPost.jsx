import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getPost} from "../api/getPost";
import "../styles/AddPost.scss";

const AddPost = () => {
  
  const {id}=useParams();
  
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
      getSinglePost(id);
    }
  },[id])

  const getSinglePost=async(id)=>{
    const singlePost=await getPost(id);
    setFormData({
      id:singlePost.id,
      title:singlePost.title,
      body:singlePost.body,
      userId:2
    })
  }

  const submitPost=async()=>{
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts',formData);
      
      setFormData({
        id:0,
        title:"",
        body:"",
        userId:2
      })
      toast.success("Post is added");  

    } catch (error) {
      toast.error("Sorry!The post is not added")
    }
  }

  const editPost=async()=>{
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,formData);
      toast.success("Post is updated");
    } catch (error) {
      toast.error("Sorry!The post is not updated")
    }
  }
  
  return (
    <div className="add-post-container">
      <ToastContainer />
      <textarea name="title" className="title-textarea" onChange={handelChange} value={title} placeholder="Title.."></textarea>
      <textarea name="body" className="body-textarea" onChange={handelChange} value={body} placeholder="Whats on your MIND...."></textarea>
      {id?(
        <button className="btn-sumbit-post" onClick={editPost}>Edit Post</button>
      ):(
        <button className="btn-sumbit-post" onClick={submitPost}>Add Post</button>
      )}
    </div>
  )
}

export default AddPost
