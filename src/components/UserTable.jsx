import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Users.scss";

const UserTable = ({user,id}) => {
  return (
    <>
      <tbody>
          <tr>
            <td>
              <Link className="user-name-link" to={`/user/${id}`}>{user.name}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.website}</td>
          </tr>
        </tbody>
    </>
  )
}

export default UserTable
