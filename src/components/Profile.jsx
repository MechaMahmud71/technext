import React,{useContext,useEffect,useState} from 'react';
import {ProfileContext} from "../App";
import Post from './Post';
import { getPosts } from '../api/getPost';

 const Profile = () => {
  const [posts,setPosts]=useState([]);
 
  const URL='https://jsonplaceholder.typicode.com/users/2/posts';
  
  useEffect(()=>{
    getUserPosts();
    
  },[])

  const getUserPosts=async()=>{
    const userPosts=await getPosts(URL);
    setPosts(userPosts)
  }
  
  const mappedPost=posts.map((el,index)=><Post value={el} key={index+1}/>)
  const profile=useContext(ProfileContext);

  return (
    <div>
      {profile.name}
      {mappedPost}
    </div>
  )
}

export default Profile;