import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import spotifyService from "./../../services/spotify-service";
require("dotenv").config();

class albumPage extends Component {
  state = {
      songs: [], 
      album: [],
  };

  retrieveTracksFromAlbum = () => {
    const { id } = this.props.match.params;
    spotifyService.getAlbumTracks(id)
      .then((data) => {
          this.setState({songs: data})
      })
      .catch((err) => console.log(err));
  };

  retrieveAlbumInfo = () => {
    const { id } = this.props.match.params; 
    spotifyService.getOneAlbum(id)
    .then((data) => {
        console.log(data);
        
        this.setState({album: data})
    })
    .catch((err) => console.log(err));
  }

  componentDidMount(){
    this.retrieveTracksFromAlbum();
    this.retrieveAlbumInfo(); 
  }

  render() {
    return (
        <div className="album-page-container">
            <h1>Track List of {this.state.album.name}</h1>
            {this.state.album.images &&  <img src={this.state.album.images[0].url} alt="cover" className="album-image"/> }
            <p>Released on: {this.state.album.release_date}</p>
            <p>Label: {this.state.album.label}</p>
            <ul>
                {this.state.songs.map((el) => {
                    return (
                        <li key="el.id">
                            <div>
                                <p>{el.name}</p>
                                {el.preview_url &&
                                <audio controls src={el.preview_url} />}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button className="back-btn" onClick={this.props.history.goBack}>
                 Go Back
            </button>
            
        </div>
    );
  }
}

export default withAuth(albumPage);
