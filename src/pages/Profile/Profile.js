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
        mode: ""
    }

    /* getArtist = (artistsId) => {
        let artistsNames = []
        console.log(artistsNames)

        for (let i = 0; i < artistsId.length; i++) {
            spotifyService.getArtist(artistsId[i])
            .then( (data) => {
                const stringifiedData = JSON.stringify(data.name)
                artistsNames.push(stringifiedData)
            })
        }
        
        console.log(artistsNames)
        return artistsNames;
    } */

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
        
        /* const artistsId = data.preferences;
        const artistsNames = this.getArtist(artistsId); */

        userService.getUser(id)
        .then( (data) => {
            this.setState({ username: data.username, email: data.email, image: data.image, preferences: data.preferences })
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
                    <div key={onePref}>
                        <p>{onePref}</p>
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
