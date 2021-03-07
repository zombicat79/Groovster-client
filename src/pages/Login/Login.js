import React, { Component } from "react";
import { withAuth } from './../../context/auth-context';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div id="cover-background">
       <form className="input-form" onSubmit={this.handleFormSubmit}>
          
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>

          <label>Password</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input id="submit-button"type="submit" value="Go!" />

        </form>
      </div>
    );
  }
}

export default withAuth(Login);
