import React,{useContext} from 'react'
import {Link,useParams} from "react-router-dom";
import {ProfileContext} from "../App";

function Post({value}) {
  const {id}=useParams();
  const profile=useContext(ProfileContext);
  
  return (

    <div>
      <h1>{value.title}</h1>
      <p>{value.body}</p>
      {id? null: <Link to={`/post/${value.id}`}>See Details</Link>}
      {profile.id===value.userId?(
        <>
          <Link to={`/post/${value.id}/update`}>update</Link>
          <button>delete</button>
        </>
      ):null}
      <br/>
    </div>
  )
}

export default Post
