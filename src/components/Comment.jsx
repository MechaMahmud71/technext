import React from 'react'

function Comment({value}) {
  return (
    <div>
      <div>{value.email}</div>
      <div>{value.body}</div>
    </div>
  )
}

export default Comment;
