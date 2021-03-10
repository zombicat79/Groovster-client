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
            <div className="chat-page">
                <h3>Welcome to {this.state.name}'s room</h3>
                <button className="back-btn-chat" onClick={this.props.history.goBack}>
                   ⇦
                </button>
                <ChatRoom username={this.state.name}/>
            </div>
        )
        
    }
}

export default Chat
