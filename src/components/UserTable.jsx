import React from 'react';
import { Link } from 'react-router-dom'

const UserTable = ({user,id}) => {
  return (
    <>
      <tbody>
          <tr>
            <td>
              <Link to={`/user/${id}`}>{user.name}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.website}</td>
          </tr>
        </tbody>
    </>
  )
}

export default UserTable
