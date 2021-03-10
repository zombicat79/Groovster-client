import React, { Component } from 'react'
import { withAuth } from './../../context/auth-context';
import { withMode } from './../../context/mode-context';
import userService from './../../services/user-service';

import axios from 'axios';

import avatarLight from './../../images/default-avatar.png'
import avatarDark from './../../images/default-avatar-dark.png'

import './../../App.css'  
import './Settings.css'

import spotifyService from '../../services/spotify-service';

class Settings extends Component {
    state = {
        username: "",
        email: "",
        image: "",
        preferences: [],
        artistSearch: "",
        genreSearch: "",
        mode: "",
        unfoldedButtons: "folded",
        switch: false
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

    handleImageUpload = (event) => {
        const file = event.target.files[0]; // we get the uploaded image

        const uploadData = new FormData();
        uploadData.append('image', file);

        // we send the photo to the route that uploads it to Cloudinary
        axios.post("http://localhost:5000/api/users/photo", uploadData, { withCredentials: true })
        .then( (response) => {
            const {imageUrl} = response.data;
            this.setState({ image: imageUrl })
        })
        .catch( (err) => console.log(err));
    }

    handleUnfolding = () => {
        if (this.state.unfoldedButtons === "folded") {
            this.setState({ unfoldedButtons: "unfolded" })
          }
        else {
            this.setState({ unfoldedButtons: "folded" })
        }
    }

    logout = () => {
        this.props.logout();
    }

    deleteAccount = () => {
        const id = this.props.user._id;

        userService.deleteUser(id)
        .then( () => {
            this.props.logout();
        })
    }

    toggleMode = () => {
        this.props.toggleMode();
        console.log(this.props)
    }

    handleMode = () => {
        if (this.props.modeIsDark === true) {
          this.setState({ mode: "dark" })
        }
        else {
          this.setState({ mode: "light" })
        }
      }

    componentDidMount = () => {
        const id = this.props.user._id;
        this.handleMode();

        userService.getUser(id)
        .then((data) => {
            this.setState({ username: data.username, email: data.email, image: data.image, preferences: data.preferences})
        })
    }

    render() {
        return (
            <main className={`main-${this.state.mode}`}>
                <form id={`settings-form-${this.state.mode}`} className={`input-form-${this.state.mode}`} name="modifyProfile" encType="multipart/form-data" 
                onSubmit={(event) => this.handleFormSubmit(event)}>
                    <label>Username: </label>
                    <input className={`settings-input-${this.state.mode}`} type="text" name="username" placeholder={this.props.user.username} 
                    value={this.state.username} onChange={(event) => this.handleChange(event)} />

                    <label>Email: </label>
                    <input className={`settings-input-${this.state.mode}`} type="email" name="email" placeholder={this.props.user.email} 
                    value={this.state.email} onChange={(event) => this.handleChange(event)} />

                    <label>Picture: </label>
                    { this.state.image &&
                        <img id="selected-img" src={this.state.image === "/static/media/default-avatar.eb8ac4ec.png"
                                ? this.state.mode === "light" 
                                    ? avatarLight 
                                    : avatarDark
                                : this.state.image} />
                    }
                    <input 
                        id={`image-input-${this.state.mode}`}
                        type="file" 
                        name="image" 
                        onChange={this.handleImageUpload} 
                    />

                    <label>Password :</label>
                    <input className={`settings-input-${this.state.mode}`} />

                    <input id={`submit-changes-button-${this.state.mode}`} type="submit" value="Change" />
                </form>
                <div>
                    <button id={`switch-mode-button-${this.state.unfoldedButtons}-${this.state.mode}`} 
                    onClick={this.toggleMode}>{this.state.mode === "light" ? "Switch to dark mode" : "Switch to light mode"}</button>
                </div>
                <div className="button-container">
                    <button id={`logout-button-${this.state.unfoldedButtons}-${this.state.mode}`} onClick={this.handleUnfolding}>Log out</button>
                    <p id={`reassurance-${this.state.unfoldedButtons}-${this.state.mode}`}>You sure?</p>
                    <input id={`reassurance-checkbox-${this.state.unfoldedButtons}-${this.state.mode}`} type="checkbox" onClick={this.logout} />
                </div>
                <div className="button-container">
                    <button id={`delete-account-button-${this.state.unfoldedButtons}-${this.state.mode}`} onClick={this.handleUnfolding}>Delete account</button>
                    <p id={`out-of-mind-${this.state.unfoldedButtons}-${this.state.mode}`}>Are you out of your mind?</p>
                    <input id={`out-of-mind-checkbox-${this.state.unfoldedButtons}-${this.state.mode}`} type="checkbox" onClick={this.deleteAccount} />
                </div>
            </main>
        )
    }
}

export default withAuth(withMode(Settings));
