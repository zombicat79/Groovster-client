import React, { Component } from 'react'
import { withAuth } from './../../context/auth-context';
import { withMode } from './../../context/mode-context';
import { Link } from 'react-router-dom';
import userService from './../../services/user-service';

import avatarLight from './../../images/default-avatar.png'
import avatarDark from './../../images/default-avatar-dark.png'

import './../../App.css'
import './Profile.css'
import spotifyService from '../../services/spotify-service';

class Profile extends Component {
    state = {
        username: "",
        email: "",
        image: "",
        preferences: [],
        events: [],
        mode: ""
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
        this.handleMode();
        const id = this.props.user._id;

        userService.getUser(id)
        .then((data) => {
            const { username, email, image, preferences, events } = data
            console.log(events)
            
            if (preferences.length > 0) {
                spotifyService.getArtists(preferences)
                .then( (prefs) => {
                    console.log(prefs.data.body.artists);
                    this.setState({ username, email, image, events, preferences: prefs.data.body.artists})
                })
            }
            else {
                this.setState({ username, email, image, preferences, events})
            }
        })
    }

    render() {
         return (
            <main className={`main-${this.state.mode}`}>
                <div>
                    <img id={`profile-image-${this.state.mode}`} 
                    src={this.state.image === "/static/media/default-avatar.eb8ac4ec.png"
                    ? this.state.mode === "light" 
                        ? avatarLight 
                        : avatarDark
                    : this.state.image} />
                    <p className={`profile-info-${this.state.mode}`}>{this.state.username}</p>
                    <p className={`profile-info-${this.state.mode}`}>{this.state.email}</p>
                </div>
                <div>
                {this.state.preferences.map((onePref, i) => {
                    return (
                    <div key={onePref.id}>
                        <img src={onePref.images[0].url} />
                    </div>)
                })}
                </div>
                <div>
                {this.state.events.map((oneEvent, i) => {
                    return (
                    <div key={oneEvent._id}>
                        <p>{oneEvent.title}</p>
                        <p>{oneEvent.description}</p>
                    </div>)
                })}
                </div>

                <Link to="/settings">
                    <button id={`update-button-${this.state.mode}`}>Update</button>
                </Link>
            </main>
        )
    }
}

export default withAuth(withMode(Profile));
