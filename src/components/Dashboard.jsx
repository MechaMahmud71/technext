import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from './Post';

function Dashboard() {
  
  const [posts,setPosts]=useState([]);
  const [visible,setVisible]=useState(10);

  useEffect(()=>{
    getPosts();
  },[])

  const getPosts=async()=>{
    try {
      const {data}= await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(data)
    } catch (error) {
      console.log("error in fetching data")
      
      //later error component will be added inshaAllah
    }
  }
  
  const loadMore=()=>{
    setVisible((previousValue)=>previousValue+10)
  }

  const mappedPost=posts.slice(0,visible).map((el,index)=><Post value={el} key={index+1}/>)
  

  return (
    <div className="container">
      {mappedPost}
      <button className="btn-loadMore" onClick={loadMore}>Load More</button>
    </div>
  )
}

export default Dashboard
