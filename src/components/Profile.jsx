import React,{useEffect,useState} from 'react';
import Post from './Post';
import { getPosts } from '../api/getPost';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const Profile = () => {
  const [posts,setPosts]=useState([]);
  let {id}=useParams();
  
  let[profile,setPorfile]=useState({});
  

  id=id?id:2;

  let URL=`https://jsonplaceholder.typicode.com/users/${id}/posts`;
  
  const getUserPosts=async()=>{
    const userPosts=await getPosts(URL);
    setPosts(userPosts)
  }

  const getUserProfile=async()=>{
    try {
      const {data}=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      // console.log(data)
      setPorfile(data)
    } catch (error) {
      toast.error("Sorrt! Porfile is not fetched");
    }
  }

  useEffect(()=>{
    getUserPosts();
    getUserProfile();
    
  },[])

  
  const mappedPost=posts.map((el,index)=><Post value={el} key={index+1}/>)
  

  return (
    <div>
      <ToastContainer/>
      {profile.name}
      {mappedPost}
    </div>
  )
}

export default Profile;