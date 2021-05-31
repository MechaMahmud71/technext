import React from 'react';
import Users from './components/Users';
import Dashboard from './components/Dashboard';
import FullPost from './components/FullPost';
import Nav from "./components/Nav";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from "axios";


export const PostContext=React.createContext();
export const ProfileContext=React.creatContext();

function App() {
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    getPosts();
  },[])


  const getPosts=async()=>{
    try {
      const {data}= await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(data)
    } catch (error) {
      console.log("error in fetching data")
    }
  }

 
  return (
    <div className="App">
      
      <PostContext.Provider value={posts}>
        
        <Router>
          <Nav/>
          <Switch>
            <Route exact path="/">
              <Dashboard/>
            </Route>
            <Route exact path="/users">
              <Users/>
            </Route>
            <Route exact path="/post/:id">
              <FullPost/>
            </Route>
          </Switch>
        </Router>
      </PostContext.Provider>
      
    </div>
  );
}

export default App;
