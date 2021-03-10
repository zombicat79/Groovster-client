import React, { Component } from "react";
import { withAuth } from './../../context/auth-context';
import { withMode } from './../../context/mode-context';

class Login extends Component {
  state = { 
    username: "",
    password: "",
    mode: ""
   };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
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
    const { username, password } = this.state;

    return (
      <div id={`cover-background-${this.state.mode}`} className={this.state.mode}>
       <form className={`input-form-${this.state.mode}`} onSubmit={this.handleFormSubmit}>
          
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>

          <label>Password</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input id={`submit-button-${this.state.mode}`} type="submit" value="Go!" />

        </form>
      </div>
    );
  }
}

export default withAuth(withMode(Login));
