import React, { Component } from 'react'
import { withAuth } from '././../../context/auth-context';
import { Link } from 'react-router-dom';
import spotifyService from './../../services/spotify-service';
import eventService from './../../services/event-service';

class Artist extends Component {
    state = {
        name: "",
        picture: "",
        popularity: 0,
        followers: 0,
        genres: [],
        events: [],
        seeEventsIsOn: false
    }

    retrieveArtist = () => {
        const { id } = this.props.match.params;
        spotifyService.getArtist(id)
        .then( (data) => {
            this.setState({ name: data.name, picture: data.images[0].url, 
                popularity: data.popularity, followers: data.followers.total, genres: data.genres })
        })
    }

    retrieveEvents = () => {
        const { id } = this.props.match.params;
        eventService.getEvent(id)
        .then( (data) => {
            console.log(data)
            this.setState({events: data})
        })
    }

    componentDidMount() {
        this.retrieveEvents();
        this.retrieveArtist();
    }


    toggleSeeEvents = () => {
        this.setState({ seeEventsIsOn: !this.state.seeEventsIsOn})
    }

    render() {
        const { id } = this.props.match.params; 

        return (
            <div>
                <h1>{this.state.name}</h1>
                <h2>{this.state.genres}</h2>
                <div>
                    <img src={this.state.picture} alt={`${this.state.name} cover`} 
                    height="300" width="300" />
                </div>
                <div>
                    <p>Popularity: {this.state.popularity}</p>
                    <p>Followers: {this.state.followers}</p>
                </div>
                <div>
                    <button>See albums & tracks</button>
                </div>
                <div>
                    <button onClick={this.toggleSeeEvents}>
                        {this.state.seeEventsIsOn ? "Hide" : "See related events"}
                    </button>
                    {this.state.seeEventsIsOn 
                    ? (<div>
                        {this.state.events.map((oneEvent, i) => {
                            return (<p>{oneEvent.title}</p>)
                        })}
                        </div>) 
                    : null}
                    
                </div>

                <Link to={`/artist/${id}/create-event`}>
                    <button>
                    Add new event
                    </button>
                </Link>
            </div>
        )
    }
}

export default withAuth(Artist);
