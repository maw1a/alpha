import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Forgot from './screens/Forgot';
import AllChat from './screens/AllChat';
import Chat from './screens/Chat';

import Navbar from './components/Navbar';
import './App.css';

function App() {
  return(
    <div className="App-container">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Navbar />
              <Home />
            </Route>
            <Route exact path="/login">
              <Navbar />
              <Login />
            </Route>
            <Route exact path="/signup">
              <Navbar />
              <SignUp />
            </Route>
            <Route exact path="/allchats">
              <AllChat />
            </Route>
            <Route exact path="/forgot">
              <Forgot />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
