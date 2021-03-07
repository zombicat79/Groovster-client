import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import spotifyService from "./../../services/spotify-service";
require("dotenv").config();

class albumPage extends Component {
  state = {
      songs: []
  };

  retrieveTracksFromAlbum = () => {
    const { id } = this.props.match.params;
    spotifyService.getAlbumTracks(id)
      .then((data) => {
          console.log(data)
          this.setState({songs: data})
      })
      .catch((err) => console.log(err));
  };

  componentDidMount(){
    this.retrieveTracksFromAlbum();
  }

  render() {
    return (
        <div>
            <h1>Track List</h1>
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
