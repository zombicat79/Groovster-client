import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../../context/auth-context';
import { withMode } from './../../context/mode-context';

import avatar from './../../images/default-avatar.png'

class Signup extends Component {
  state = { 
    username: "",
    password: "",
    email: "",
    image: avatar,
    mode: ""
   };
  
  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email, image } = this.state;
    this.props.signup( username, password, email, image );
  };
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleMode = () => {
    if (this.props.modeIsDark === true) {
      this.setState({ mode: "dark" })
    }
    else {
      this.setState({ mode: "light" })
    }
  }

  componentDidMount() {
    this.handleMode();
  }
  
  render() {
    const { username, password, email} = this.state;
    return (
      <div id={`cover-background-expanded-${this.state.mode}`}>
        
        <form className={`input-form-${this.state.mode}`} onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          
          <label>Email </label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          
          <input id={`submit-button-${this.state.mode}`} type="submit" value="Join!" />
        </form>
        
        <Link id={`account-yet-${this.state.mode}`} to={"/login"}>
          <p>Already have an account?</p>
        </Link>
      </div>
    );
  }
}
export default withAuth(withMode(Signup));