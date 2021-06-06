import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Nav.scss";


const Nav=()=> {
  return (
    <div className="nav-container">
      
        <NavLink className="nav-link" exact activeClassName="nav-link-active" to="/"><i className="fas fa-home"></i></NavLink>
      
      
        <NavLink className="nav-link" exact activeClassName="nav-link-active" to="/profile"><i className="fas fa-user-circle"></i></NavLink>
      
      
        <NavLink className="nav-link" exact activeClassName="nav-link-active" to="/add-post"><i className="fas fa-pen-square"></i></NavLink>
      
      
        <NavLink className="nav-link" exact activeClassName="nav-link-active" to="/users"><i className="fas fa-users"></i></NavLink>
      
  </div>
  )
}

export default Nav
