import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './Pagination';
import "../styles/Users.scss";

const Users=()=> {
  
  let [users,setUsers]=useState([]);
  let [sort,setSort]=useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage,setusersPerPage] = useState(3);
  const [searchString,setSearchString]=useState("");
  const [loading,setLoading]=useState(true);

  
  useEffect(()=>{
    getUsers();
  },[])

  
  useEffect(()=>{
    getItems();
  },[])
  
  useEffect(()=>{
    setItem();
  })

  
  const setItem=()=>{
    localStorage.setItem("currentPage",currentPage);
    localStorage.setItem("usersPerPage",usersPerPage);
    localStorage.setItem("searchString",searchString);
    localStorage.setItem("sort",sort);
  }

  const getItems=()=>{
    
    const localSort=localStorage.getItem('sort');
    const localCurrentPage= localStorage.getItem("currentPage");
    const localUserPerPage=localStorage.getItem("usersPerPage");
    const localSearchString=localStorage.getItem('searchString');
    if(localSort ||localCurrentPage||localUserPerPage||localSearchString){
      setSort(localSort);
      setCurrentPage(localCurrentPage);
      setusersPerPage(localUserPerPage);
      setSearchString(localSearchString);
    }
    else{
      setSort("");
      setCurrentPage(1);
      setusersPerPage(3);
      setSearchString("");
    }
    
  }
  
  
  const getUsers=async()=>{
    try {
      const {data}=await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(data);
      setLoading(false);
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
    let value;
    let nameFilter=el.name.toLowerCase().includes(searchString.toLowerCase());
    let emailFilter=el.email.toLowerCase().includes(searchString.toLowerCase());
    let websiteFilter=el.website.toLowerCase().includes(searchString.toLowerCase())
    if(searchString===""){
      value= el;
    }
    else if(nameFilter||emailFilter||websiteFilter){
      value=el;
    }
    return value;
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
  
  if(loading){
    return(
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    )
  }
  
  return (
    <>
      <div className="users-container">
        <input type="text" onChange={search} value={searchString}  className="search-input" placeholder="Search Users By Name, Email, Website..."/>
        <ToastContainer/>
        <div className="select-divs">
          <h1 className="sort-title">Sort Table</h1>
          <select value={sort} onChange={getSort}>
            <option value="normal">Normal</option>
            <option value="asc" >Asceding</option>
            <option value="dsc">Dscending</option>
          </select>
          <h1 className="sort-title">Users Per Page</h1>
          <select value={usersPerPage} onChange={setPagination}>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">All</option>
          </select>
        </div>
      </div>
      <table className="user-table">
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
