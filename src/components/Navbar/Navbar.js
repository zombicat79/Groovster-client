import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../../context/auth-context';

import './Navbar.css';

import logo from './../../images/groovster-logo.png'
import menu from './../../images/hamburger-icon.png'


class Navbar extends Component {
  state = {
    menuIsOn: false,
    showWelcome: "" 
  }

  toggleMenu = () => {
    if (this.state.showWelcome === "") {
      this.setState({ showWelcome: "user-welcome", menuIsOn: !this.state.menuIsOn })
    }
    else {
      this.setState({ showWelcome: "", menuIsOn: !this.state.menuIsOn })
    }
  }

  logout = () => {
    if (this.state.showWelcome === "") {
      this.setState({ showWelcome: "user-welcome", menuIsOn: false })
      this.props.logout();
    }
    else {
      this.setState({ showWelcome: "", menuIsOn: false })
      this.props.logout();
    }
  }

  render() {
    return (
      <nav>
        {this.props.isLoggedIn ? (
          <div id="navbar-in">
            <Link to={'/'} id='home-btn'>
              <img id="logo" src={logo} alt="logo"/>
            </Link>
            <p className="welcome" id={this.state.showWelcome}>Let's rock it, {this.props.user && this.props.user.username}!</p>
            {this.state.menuIsOn ? (
              <div id="menu-unfold">
                <p id="menu-close" onClick={this.toggleMenu}>X</p>
                <p className="menu-item">About</p>
                <Link className="menu-link" to="/settings">
                  <p className="menu-item">Settings</p>
                </Link>
                <p className="menu-item" onClick={this.logout}>Logout</p>
              </div>) : (<img id="menu-icon" src={menu} onClick={this.toggleMenu} alt="menu-icon"/>)}
          </div>
          ) : (
          <div id="navbar-out">
            <Link to="/login">
              <button className="navbar-button">Login</button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              <button className="navbar-button">Sign Up</button>{' '}
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
