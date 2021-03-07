import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../../context/auth-context';

class Signup extends Component {
  state = { username: "", password: "", email: "" };
  
  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email } = this.state;
    this.props.signup( username, password, email );
  };
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  render() {
    const { username, password, email} = this.state;
    return (
      <div id="cover-background-expanded">
        
        <form className="input-form" onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          
          <label>Email </label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          
          <input id="submit-button" type="submit" value="Join!" />
        </form>
        
        <Link id="account-yet" to={"/login"}>
          <p>Already have an account?</p>
        </Link>
      </div>
    );
  }
}
export default withAuth(Signup);
// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;