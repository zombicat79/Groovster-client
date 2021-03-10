import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { withMode } from './context/mode-context'

// Pages
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Artist from './pages/Artist/Artist';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import Profile from './pages/Profile/Profile'
import About from './pages/About/About'

// Components
import Navbar from './components/Navbar/Navbar';
import AnonRoute from './components/AnonRoute/AnonRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Main from './components/Main/Main'
import musicPage from './components/musicPage/musicPage';
import albumPage from './components/albumPage/albumPage';
import Chat from './components/Chat/Chat'
import ProfilePage from './components/ProfilePage/ProfilePage';

class App extends Component {
  state = {
    mode: ""
  }
  
  render() {
    // console.warn = () => {};
    // console.error = () => {};
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/main" component={Main} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/artist/:id" component={Artist} />
          <PrivateRoute exact path="/artist/:id/create-event" component={CreateEvent} />
          <PrivateRoute exact path="/artist/:id/music" component={musicPage} />
          <PrivateRoute exact path="/artist/album/track/:id" component={albumPage} />
          <PrivateRoute exact path="/artist/chat/:id" component={Chat} />
          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />

        </Switch>
      </div>
    );
  }
}

export default withMode(App);
