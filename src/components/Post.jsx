import React from 'react'
import {Link,useParams} from "react-router-dom";

function Post({value}) {
  const {id}=useParams();
  // console.log(id)
  return (

    <div>
      <h1>{value.title}</h1>
      <p>{value.body}</p>
      {id? null: <Link to={`/post/${value.id}`}>See Details</Link>}
      <br/>
    </div>
  )
}

export default Post
