import React from 'react';
import Users from './components/Users';
import Dashboard from './components/Dashboard';
import FullPost from './components/FullPost';
import Nav from "./components/Nav";
import Profile from './components/Profile';
import AddPost from './components/AddPost';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {useEffect,useReducer } from 'react';
import axios from "axios";


import { initialState,reducer } from './reducers/Reducer';


export const ProfileContext=React.createContext();

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(()=>{
    getProfile();
  },[])


  

  const getProfile=async()=>{
    try {
      const {data}= await axios.get(`https://jsonplaceholder.typicode.com/users/2`);
      // console.log(data)
      dispatch({type:"FETCH_SUCCESS",payload:data})
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' })
    }
  }


 
  return (
    <div className="App">
      
      <ProfileContext.Provider value={state.profile}>
        
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
              <Route exact path="/profile">
                <Profile/>
              </Route>
              <Route exact path="/user/:id">
                <Profile/>
              </Route>
              <Route exact path="/add-post">
                <AddPost/>
              </Route>
              <Route exact path="/edit-post/:id">
                <AddPost/>
              </Route>
              
            </Switch>
          </Router>
        
      </ProfileContext.Provider>
    
    </div>
  );
}

export default App;
