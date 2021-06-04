import axios from 'axios';
import React,{useContext} from 'react'
import {Link,useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProfileContext} from "../App";

const Post=({value})=> {
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

    <div>
      <ToastContainer/>
      <h1>{value.title}</h1>
      <p>{value.body}</p>
      {id? null: <Link to={`/post/${value.id}`}>See Details</Link>}
      {profile.id===value.userId?(
        <>
          <Link to={`/edit-post/${value.id}`}><i className="fas fa-pencil-alt"></i></Link>
          <button onClick={deletePost} className="btn-delete-btn"><i className="far fa-trash-alt"></i></button>
        </>
      ):null}
      <br/>
    </div>
  )
}

export default Post
