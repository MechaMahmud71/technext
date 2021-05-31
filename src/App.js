import Users from './components/Users';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route exact path="/users">
            <Users/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
