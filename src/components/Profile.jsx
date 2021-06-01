import React,{useEffect,useState} from 'react';
import Post from './Post';
import { getPosts } from '../api/getPost';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserPosts();
    getUserProfile();
    
  },[])

  
  const mappedPost=posts.map((el,index)=><Post value={el} key={index+1}/>)
  

  return (
    <div>
      {profile.name}
      {mappedPost}
    </div>
  )
}

export default Profile;