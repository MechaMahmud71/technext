import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './Pagination';

const Users=()=> {
  let [users,setUsers]=useState([]);
  const [sort,setSort]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage,setusersPerPage] = useState(3);
  const [searchString,setSearchString]=useState("");

  useEffect(()=>{
    getUsers();
  },[])

  const getUsers=async()=>{
    try {
      const {data}=await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(data)
    } catch (error) {
      toast.error("Sorry! Users are not fetched")
    }
  }

  const getSort=(e)=>{
    setSort(e.target.value)
  }

  const setPagination=(e)=>{
    setusersPerPage(e.target.value)
  }

  const search=(e)=>{
    setSearchString(e.target.value);
    
  }


   users=users.filter((el)=>{
    if(searchString===""){
      return el;
    }
    else if(el.name.toLowerCase().includes(searchString.toLowerCase())){
      return el;
    }
  })

  let sortedUsers = users.slice(0);
  
 sortedUsers.sort(function(a,b) {
    let x,y
    if(sort==='asc'){
      x = a.name.toLowerCase();
      y = b.name.toLowerCase();
    }
    if(sort==="dsc"){
      x = a.email.toLowerCase();
      y = b.email.toLowerCase();
    }
   
    return x < y ? -1 : x > y ? 1 : 0;
  });

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstPost, indexOfLastPost);
  
  const userDOM=currentUsers.map((el,index)=><UserTable user={el} key={index+1} id={el.id}/>)
  
  
  
  return (
    <>
      <div>
        <input type="text" onChange={search} value={searchString} />
        <ToastContainer/>
        <select value={sort} onChange={getSort}>
          <option value="normal">Normal</option>
          <option value="asc" >Asceding</option>
          <option value="dsc">Dscending</option>
        </select>

        <select value={usersPerPage} onChange={setPagination}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">All</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th> 
            <th>Website</th>
          </tr>
        </thead>
        {userDOM}
      </table>
      <Pagination
        usersPerPage={usersPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />
    </>
  )
}

export default Users
