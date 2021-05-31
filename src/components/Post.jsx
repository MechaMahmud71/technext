import React from 'react'

function Post({value}) {
  console.log(value)
  return (
    <div>
      <div>{value.id}</div>
      <div>{value.title}</div>
      <div>{value.body}</div>
      <br/>
    </div>
  )
}

export default Post
