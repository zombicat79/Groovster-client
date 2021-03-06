import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import { withMode } from './../../context/mode-context';
import spotifyService from "./../../services/spotify-service";
require("dotenv").config();

class albumPage extends Component {
  state = {
      songs: [], 
      album: [],
      mode: "",
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
        <div className={`album-page-container album-page-container-${this.state.mode}`}>
            <h1>Track List of {this.state.album.name}</h1>
            {this.state.album.images &&  <img src={this.state.album.images[0].url} alt="cover" className="album-image"/> }
            <p className="album-page-text">Released on: {this.state.album.release_date}</p>
            <p className="album-page-text">Label: {this.state.album.label}</p>
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
            <button className="back-btn-album-page" onClick={this.props.history.goBack}>
                 Go Back
            </button>
            
        </div>
    );
  }
}

export default withAuth(withMode(albumPage));
