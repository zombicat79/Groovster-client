import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import { withMode } from './../../context/mode-context';
import spotifyService from "./../../services/spotify-service";
import { Link } from "react-router-dom";
require("dotenv").config();

class musicPage extends Component {
  state = {
    name: "",
    picture: "",
    popularity: 0,
    followers: 0,
    genres: [],
    albums: [], 
    songs: [],
    mode: "",
  };

  retrieveArtist = () => {
    const { id } = this.props.match.params;
    spotifyService.getArtist(id).then((data) => {
      this.setState({
        name: data.name,
        picture: data.images[0].url,
        popularity: data.popularity,
        followers: data.followers.total,
        genres: data.genres,
      });
    });
  };

  retrieveAlbum = () => {
    const { id } = this.props.match.params;    
    spotifyService.getAlbum(id)
    .then((data) => {
        this.setState({albums: data.items})
        console.log(this.state.albums);
    });
  };

  retrieveTracks = () => {
    const { id } = this.props.match.params;    
    spotifyService.getTopTracks(id)
    .then( (data) => {
        this.setState({songs: data.tracks.slice(0,10)})
        console.log(data.tracks)
    })
  }

  componentDidMount() {
    this.retrieveArtist();
    this.retrieveAlbum();
    this.retrieveTracks();
    this.handleMode();
  }

  handleMode = () => {
    if (this.props.modeIsDark === true) {
      this.setState({ mode: "dark" })
    }
    else {
      this.setState({ mode: "light" })
    }
  }

  render() {
    return (
      <div className={`music-page-container music-page-container-${this.state.mode}`}>
        <h1>{this.state.name}</h1>
        <h2>{this.state.albums.length} Albums</h2>
        <div className="album-box">
            {this.state.albums.map((el) => {
                return (
                    <div key={el.id}>
                        <Link to={`/artist/album/track/${el.id}`}>
                            <img className="album-image" src={el.images[0].url} alt="album"/>
                            <p>{el.name}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
        <h2>{this.state.name}'s top tracks</h2>
            {this.state.songs.map((el)=> {
                
                return (
                    el.preview_url &&
                    <div key={el.id}>
                        <p>{el.name}</p>
                        <audio controls src={el.preview_url} />
                    </div>
                )
            })
            }
        <button className="back-btn-music-page" onClick={this.props.history.goBack}>
          Go Back
        </button>
      </div>
    );
  }
}

export default withAuth(withMode(musicPage));
