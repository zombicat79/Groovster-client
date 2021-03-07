import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Artist from './pages/Artist/Artist';
import CreateEvent from './pages/CreateEvent/CreateEvent';

// Components
import Navbar from './components/Navbar/Navbar';
import AnonRoute from './components/AnonRoute/AnonRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Main from './components/Main/Main'



class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/main" component={Main} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/artist/:id" component={Artist} />
          <PrivateRoute exact path="/artist/:id/create-event" component={CreateEvent} />
        </Switch>
      </div>
    );
  }
}

export default App;
