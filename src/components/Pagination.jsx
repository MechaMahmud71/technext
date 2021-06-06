import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Pagination.scss";

const Pagination = ({ usersPerPage, totalPosts, paginate,page,id }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <nav className="pagination-container">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            {page==="profile"?(
              <NavLink onClick={() => paginate(number)} to={`/user/${id}`} className='page-link'>
                {number}
              </NavLink>
            ):(
              <NavLink onClick={() => paginate(number)} to='/users' className='page-link'>
                {number}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;