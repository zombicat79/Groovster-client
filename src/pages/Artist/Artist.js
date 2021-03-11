import React, { Component } from "react";
import { withAuth } from "./../../context/auth-context";
import { withMode } from "./../../context/mode-context"
import { Link } from "react-router-dom";
import spotifyService from "./../../services/spotify-service";
import eventService from "./../../services/event-service";
import userService from "./../../services/user-service";

import './../../App.css';
import './Artist.css';

import backLight from './../../images/go-back-light.png';
import backDark from './../../images/go-back-dark.png';

class Artist extends Component {
  state = {
    name: "",
    picture: "",
    popularity: 0,
    followers: 0,
    genres: [],
    events: [],
    seeEventsIsOn: false,
    mode: ""
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

  retrieveEvents = () => {
    const { id } = this.props.match.params;
    eventService.getEvent(id).then((data) => {
      console.log(data);
      this.setState({ events: data });
    });
  };

  componentDidMount() {
    this.handleMode();
    this.retrieveEvents();
    this.retrieveArtist();
  }

  toggleSeeEvents = () => {
    this.setState({ seeEventsIsOn: !this.state.seeEventsIsOn });
  };

  updateChatModel = () => {
    const { id } = this.props.match.params;
    const userId = this.props.user._id;
    userService
      .modifyUserChat(userId, id)
      .then((data) => console.log("success"))
      .catch((err) => console.log(err));
  };

  handleMode = () => {
    if (this.props.modeIsDark === true) {
      this.setState({ mode: "dark" })
    }
    else {
      this.setState({ mode: "light" })
    }
  } 

  render() {
    const { id } = this.props.match.params;

    return (
      <div id={this.state.mode === "dark" ? `artist-main-dark` : null}
          className={this.state.mode === "light" ? `main-light page-margin-light` : null}>
        <img id={`artist-goback-${this.state.mode}`} 
            src={this.state.mode === "light" ? backLight : backDark}
            onClick={this.props.history.goBack} 
            alt="go-back-btn"
            />
        <h1 id={`band-name-${this.state.mode}`}>{this.state.name}</h1>
        <h2 id={`genre-display-${this.state.mode}`}>
          {this.state.genres.map((el, index) => {
            return (
              <span key={index}>
                {" "}
                {el.charAt(0).toUpperCase() + el.slice(1)} |
              </span>
            );
          })}
        </h2>

        <div>
          <img
            id={`band-picture-${this.state.mode}`}
            src={this.state.picture}
            alt={`${this.state.name} cover`}
            height="300"
            width="300"
          />
        </div>

        <div>
          <p className={`regular-text-${this.state.mode}`}>Popularity: {this.state.popularity}</p>
          <p className={`regular-text-${this.state.mode}`}>Followers: {this.state.followers}</p>
        </div>

        <Link to={`/artist/chat/${id}/`}>
          <div>
            <button className={`artist-button-${this.state.mode}`} onClick={this.updateChatModel}>ENTER CHAT</button>
          </div>
        </Link>

        <Link to={`/artist/${id}/music`}>
          <div>
            <button className={`artist-button-${this.state.mode}`}>Albums & tracks</button>
          </div>
        </Link>

        <div>
          <button className={`artist-button-${this.state.mode}`} onClick={this.toggleSeeEvents}>
            {this.state.seeEventsIsOn ? "Hide" : "Related events"}
          </button>
          {this.state.seeEventsIsOn ? (
            <div id={`band-events-${this.state.mode}`}>
              {this.state.events.map((oneEvent, i) => {
                return <Link className={`regular-text-${this.state.mode}`} to={`/artist/event/${oneEvent._id}`} key={oneEvent._id}>{oneEvent.title}</Link>;
              })}
            </div>
          ) : null}
        </div>

        <Link to={`/artist/${id}/create-event`}>
          <button className={`artist-button-${this.state.mode}`}>Add event</button>
        </Link>
      </div>
    );
  }
}

export default withAuth(withMode(Artist));
