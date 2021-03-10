import React, { Component } from 'react'
import { withAuth } from './../../context/auth-context';
import { withMode } from './../../context/mode-context';
import userService from './../../services/user-service';

import './../../App.css'  

class Settings extends Component {
    state = {
        username: "",
        email: "",
        image: "",
        artistSearch: "",
        genreSearch: "",
        profileIsOn: false,
        preferencesIsOn: false,
    }

    handleFormSubmit (event) {
        event.preventDefault();
        
        const id = this.props.user._id;
        const { username, email, image, artistSearch, genreSearch } = this.state;
        
        if (event.target.name === "modifyProfile") {
            if (username) {
                userService.modifyUser(id, {username})
                .then( (data) => {
                this.setState({ username: ""})
                })
                return;
            }
            if (email) {
                userService.modifyUser(id, {email})
                .then( (data) => {
                this.setState({ email: "" })
                })
                return;
            }
            if (image) {
                userService.modifyUser(id, {image})
                .then( (data) => {
                this.setState({ picture: "" })
                })
                return;
            }
            if (username && email) {
                userService.modifyUser(id, {username, email})
                .then( (data) => {
                this.setState({ username: "", email: "" })
                })
                return;
            }
        }

        if (event.target.name === "addArtist") {
            userService.modifyUser(id, {$push: {preferences: artistSearch}})
            .then( (data) => {
            this.setState({ artistSearch: "" })
            })
            return;
        }

        if (event.target.name === "addGenre") {
            userService.modifyUser(id, {$push: {preferences: genreSearch}})
            .then( (data) => {
            this.setState({ genreSearch: "" })
            })
            return;
        }
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
        const buttonState = this.state.profileIsOn;
        this.setState({ profileIsOn: !buttonState })
    }

    togglePreferences = () => {
        const buttonState = this.state.preferencesIsOn;
        this.setState({ preferencesIsOn: !buttonState })
    }

    toggleMode = () => {
        this.props.toggleMode();
    }

    render() {
        
        return (
            <main>
                <div>
                    <button onClick={this.togglePreferences}>
                        {this.state.preferencesIsOn ? "Hide preferences" : "Modify preferences"}
                    </button>

                    {this.state.preferencesIsOn 
                    ? (<div><form name="addArtist" onSubmit={(event) => this.handleFormSubmit(event)}>
                        <input type="text" name="artistSearch" value={this.state.artistSearch} 
                        onChange={(event) => this.handleChange(event)} />
                        <input type="submit" value="Add" />
                        <div></div>
                    </form>

                    <form name="addGenre" onSubmit={(event) => this.handleFormSubmit(event)}>
                        <input type="text" name="genreSearch" value={this.state.genreSearch} 
                        onChange={(event) => this.handleChange(event)} />
                        <input type="submit" value="Add" />
                        <div></div>
                    </form></div>)
                    : null}
                </div>
                <div>
                    <button onClick={this.toggleProfile}>
                        {this.state.profileIsOn ? "Hide profile" : "Modify profile"}
                    </button>
                    
                    {this.state.profileIsOn 
                    ? (<div><form name="modifyProfile" enctype="multipart/form-data" onSubmit={(event) => this.handleFormSubmit(event)}>
                        <label>Username: </label>
                        <input type="text" name="username" placeholder={this.props.user.username} 
                        value={this.state.username} onChange={(event) => this.handleChange(event)} />

                        <label>Email: </label>
                        <input type="email" name="email" placeholder={this.props.user.email} 
                        value={this.state.email} onChange={(event) => this.handleChange(event)} />

                        <label>Picture: </label>
                        <input type="file" name="image" value={this.state.image} 
                        onChange={(event) => this.handleChange(event)} />

                        <label>Password :</label>
                        <input />

                        <input type="submit" value="Submit" />
                    </form>

                    <button onClick={this.deleteAccount}>Delete account</button></div>)
                    : null}
                </div>
                <div>
                    <button onClick={this.toggleMode}>Switch to dark mode</button>
                </div>
                <div>
                    <button onClick={this.props.logout}>Log out</button>
                </div>
            </main>
        )
    }
}

export default withAuth(withMode(Settings));
