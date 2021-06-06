import React,{useEffect,useState} from 'react';
import Post from './Post';
import { getPosts } from '../api/getPost';
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Profile.scss";

 const Profile = () => {
  
  let [posts,setPosts]=useState([]);
  let {id}=useParams();
  const [loading,setLoading]=useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage=3;
  let[profile,setPorfile]=useState({});
  

  id=id?id:2;

  let URL=`https://jsonplaceholder.typicode.com/users/${id}/posts`;
  
  const getUserPosts=async(URL)=>{
    const userPosts=await getPosts(URL);
    setPosts(userPosts)
    setLoading(false)
  }

  const getUserProfile=async(id)=>{
    try {
      const {data}=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      // console.log(data)
      setLoading(false);
      setPorfile(data)
    } catch (error) {
      toast.error("Sorrt! Porfile is not fetched");
    }
  }

  useEffect(()=>{
    getUserPosts(URL);
    getUserProfile(id);
    
  },[URL,id])
  
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts =posts.slice(indexOfFirstPost, indexOfLastPost);
  
  
  const mappedPost=currentPosts.map((el,index)=><Post value={el} key={index+1}/>)
  
  if(loading){
    return(
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div>
      <ToastContainer style={{fontSize:"1.5rem"}}/>
      <div className="profile-container">
        <div className="profile-hero">
          <div className="upper">
            <p className="profile-name">
              {profile.name}
            </p>
          </div>
          <div className="lower">
            <p className="profile-email"><i className="fas fa-envelope"></i><span className="span-text">{profile.email}</span></p>
            <p className="profile-phone"><i className="fas fa-phone-square"></i><span className="span-text">{profile.phone}</span></p>
            <p className="profile-website"><i className="fas fa-globe-americas"></i><span className="span-text">{profile.website}</span></p>
          </div>
        </div>
      </div>
      
      {mappedPost}
      <Pagination
        usersPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        page={"profile"}
        id={id}
      />
    </div>
  )
}

export default Profile;