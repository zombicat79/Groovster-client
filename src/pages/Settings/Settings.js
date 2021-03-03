import React, { Component } from 'react'
import { withAuth } from './../../context/auth-context';
import userService from './../../services/user-service';

class Settings extends Component {
    state = {
        username: "",
        email: "",
        profileIsOn: false
    }

    handleFormSubmit (event) {
        event.preventDefault();
        
        const id = this.props.user._id;
        const { username, email } = this.state;
        
        userService.modifyUser(id, {username, email})
        .then( (data) => {
            this.setState({ username: "", email: ""})
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    deleteAccount = () => {
        const id = this.props.user._id;

        userService.deleteUser(id)
        .then( () => {
            this.props.logout();
        })
    }

    toggleProfile = () => {
        const buttonState = this.state.profileIsOn
        this.setState({ profileIsOn: !buttonState })
    }

    render() {
        return (
            <div>
                <div>
                    <button>Change preferences</button>
                </div>
                <div>
                    <button onClick={this.toggleProfile}>Modify profile</button>
                    
                    {this.state.profileIsOn 
                    ? (<div><form onSubmit={(event) => this.handleFormSubmit(event)}>
                        <label>Username: </label>
                        <input type="text" name="username" placeholder={this.props.user.username} 
                        value={this.state.username} onChange={(event) => this.handleChange(event)} />

                        <label>Email: </label>
                        <input type="email" name="email" placeholder={this.props.user.email} 
                        value={this.state.email} onChange={(event) => this.handleChange(event)} />

                        <label>Password :</label>
                        <input />

                        <input type="submit" value="Submit" />
                    </form>

                    <button onClick={this.deleteAccount}>Delete account</button></div>)
                    : null}
                </div>
                <div>
                    <button>Switch to dark mode</button>
                </div>
                <div>
                    <button onClick={this.props.logout}>Log out</button>
                </div>
            </div>
        )
    }
}

export default withAuth(Settings);
