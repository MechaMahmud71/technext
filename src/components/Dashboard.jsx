import React, { useState,useContext } from 'react';
import Post from './Post';
import "../styles/Dashboard.css"
import {PostContext} from "../App";

function Dashboard() {
  
  
  const [visible,setVisible]=useState(10);

  const loadMore=()=>{
    setVisible((previousValue)=>previousValue+10)
  }

  const posts=useContext(PostContext);

  const mappedPost=posts.slice(0,visible).map((el,index)=><Post value={el} key={index+1}/>)
  
  
  return (
    <div className="container">
      {mappedPost}
      <button className="btn-loadMore" onClick={loadMore}>Load More</button>
    </div>
  )
}

export default Dashboard
