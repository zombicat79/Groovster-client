import React, { Component } from 'react'
import spotifyService from './../../services/spotify-service';
import ChatRoom from './ChatRoom';

 class Chat extends Component {
    state = {
        name: "",
        picture: "",
        popularity: 0,
        followers: 0,
        genres: [],
    }

    retrieveArtist = () => {
        const { id } = this.props.match.params;
        spotifyService.getArtist(id)
        .then( (data) => {
            this.setState({ name: data.name, picture: data.images[0].url, 
                popularity: data.popularity, followers: data.followers.total, genres: data.genres })
        })
    }

    componentDidMount(){
        this.retrieveArtist();
    }




    render() {
        return (
            <div>
                <h1>Chat with other fans of {this.state.name}</h1>
                <ChatRoom username={this.state.name}/>
                <button className="back-btn" onClick={this.props.history.goBack}>
                   Go Back
                </button>
            </div>
        )
        
    }
}

export default Chat
