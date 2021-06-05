import React,{useEffect,useState} from 'react';
import Post from './Post';
import { getPosts } from '../api/getPost';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Profile.scss";

 const Profile = () => {
  const [posts,setPosts]=useState([]);
  let {id}=useParams();
  
  let[profile,setPorfile]=useState({});
  

  id=id?id:2;

  let URL=`https://jsonplaceholder.typicode.com/users/${id}/posts`;
  
  const getUserPosts=async(URL)=>{
    const userPosts=await getPosts(URL);
    setPosts(userPosts)
  }

  const getUserProfile=async(id)=>{
    try {
      const {data}=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      // console.log(data)
      setPorfile(data)
    } catch (error) {
      toast.error("Sorrt! Porfile is not fetched");
    }
  }

  useEffect(()=>{
    getUserPosts(URL);
    getUserProfile(id);
    
  },[URL,id])

  
  const mappedPost=posts.map((el,index)=><Post value={el} key={index+1}/>)
  

  return (
    <div>
      <ToastContainer/>
      <div className="profile-container">
        <div className="profile-hero">
          <div className="upper">
            <p className="profile-name">
              {profile.name}
            </p>
          </div>
          <div className="lower">
            <p className="profile-email"><i className="fas fa-envelope"></i><span className="span-text">{profile.email}</span></p>
            <p className="profile-phone"><i className="fas fa-phone-square"></i><span className="span-text">{profile.phone}</span></p>
            <p className="profile-website"><i className="fas fa-globe-americas"></i><span className="span-text">{profile.website}</span></p>
          </div>
        </div>
      </div>
      
      {mappedPost}
    </div>
  )
}

export default Profile;