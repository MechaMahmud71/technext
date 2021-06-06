import axios from 'axios';
import React,{useContext} from 'react'
import {Link,useParams} from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProfileContext} from "../App";
import "../styles/Post.scss";

const Post=({value,fullPost})=> {
  const {id}=useParams();
  const profile=useContext(ProfileContext);
  
  const deletePost=async()=>{
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      
      toast.success("The Post is deleted");
    } catch (error) {
      toast.error("Sorry! The post is not deleted");
    }
  }
  
  return (

    <div className="post-container">
      
      <h1 className="post-title">{value.title}</h1>
      <p className="post-body">{value.body}</p>
      
      {fullPost? null:
       (
        <div className="link-container">
       <Link className="post-details-link" to={`/post/${value.id}`}>See Details</Link>
        </div>
       )}
        {profile.id===value.userId?(
        <div className="edit-delete-container">
          <Link className="post-edit-link" to={`/edit-post/${value.id}`}><i className="fas fa-edit"></i></Link>
          <button onClick={deletePost} className="btn-delete-btn"><i className="far fa-trash-alt"></i></button>
        </div>
      ):null}

    </div>
  )
}

export default Post
