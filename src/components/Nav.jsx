import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Nav.scss"

const Nav=()=> {
  return (
    <div className="nav-container">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/add-post">Add A Post</NavLink>
      <NavLink to="/users">Users</NavLink>
    </div>
  )
}

export default Nav
