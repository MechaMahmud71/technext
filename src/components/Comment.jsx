import React from 'react';
import "../styles/Comments.scss";

const Comment=({value})=> {
  return (
    <div className="comment-container">
      <div className="user-email">{value.email}</div>
      <div className="user-comment">{value.body}</div>
    </div>
  )
}

export default Comment;
