import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import userService from "./../../services/user-service";
import spotifyService from "../../services/spotify-service";
import authService from "../../services/auth-service";
require("dotenv").config();

class Main extends Component {
  state = {
    search: " ",
    toggle: false,
    userId: "",
    preferences: [],
    // searchArr: [],
    searchingValue: [],
    relatedArr: [],
    oneArt: [],
    randomArtists: [],
    SeveralArr: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    const { search } = this.state;
    spotifyService
      .searchArtist(search)
      .then((list) => {
        const array = list.data.body.artists.items;
        this.setState({ searchingValue: array });
      })
      .catch((err) => console.log(err));
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({ search: "" });
    this.innitArrays();
    this.updatePref();
  };

  innitArrays = () => {
    this.setState({ searchingValue: [] });
    this.setState({ oneArt: false });
    this.setState({ randomArtists: false });
    this.setState({ relatedArr: false });
    this.setState({ SeveralArr: false });
  };

  getRandom = () => {
    spotifyService.getRandomArtists().then((list) => {
      this.setState({ randomArtists: list.data.artists });
    });
  };

  getRelatedOfOne = () => {
    const index = this.state.preferences.length - 1;
    const userPref = this.state.preferences[index];
    spotifyService
      .getRelatedArtists(userPref)
      .then((list) => {
        const allArtists = list.data.body.artists;
        this.setState({ relatedArr: allArtists });
      })
      .catch((err) => {
        console.log("here is there error", err);
      });
  };

  getSeveralArtists = () => {
    this.innitArrays();
    const userId = this.props.user._id;
    authService.retrieveUser(userId).then((result) => {
      this.setState({ preferences: result.data.preferences });
      const userPref = result.data.preferences;

      spotifyService.getArtists(userPref)
        .then((list) => {
          console.log(list.data.body.artists);
          this.setState({ SeveralArr: list.data.body.artists });
        });
    });

    this.getRelatedOfOne();
  };

  getOneArtist = () => {
    const userPref = this.state.preferences;

    spotifyService.getArtist(userPref)
      .then((response) => {        
        const artist = response;
        this.setState({ oneArt: [artist] });
      })
      .catch((err) => console.log(err));
    this.getRelatedOfOne();
  };

  updatePref = () => {
    this.setState({ searchingValue: [] });
    const userId = this.props.user._id;
    
    authService.retrieveUser(userId).then((result) => {
      this.setState({ preferences: result.data.preferences }, () => {
        const userPref = this.state.preferences;
        if (userPref.length === 0) {
          this.getRandom();
        } else if (userPref.length === 1) {
          this.getOneArtist();
        } else if (userPref.length > 1) {
          this.getSeveralArtists();
        }
      })
    })
  };

  addToFav = (artistId) => {
    const user = this.props.user._id;
    userService
      .modifyUser(user, { $push: { preferences: artistId } })
      .then((data) => {
        this.updatePref();
      })
      .catch((err) => console.log(err));
    // this.updatePref();
  };

  removeFromFav = (artistId) => {
    this.innitArrays();
    const user = this.props.user._id;
    userService
      .modifyUser(user, { $pull: { preferences: artistId } })
      .then((data) => {
        this.updatePref();
      });
  };

  componentDidMount() {
    this.updatePref();
  }

  render() {
    console.log("state", this.state);

    return (
      <div className="main-page-container">
        {this.state.preferences.length === 0 && (
          <h1>Choose your favorite artists :</h1>
        )}

        <form onSubmit={this.submitForm}>
          <input
            name="search"
            type="text"
            placeholder="Who are you looking for?"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button>clear</button>
        </form>

        {/* View when using search bar */}
        {this.state.searchingValue &&
          this.state.searchingValue.map((data) => {
            return (
              <div className="artists-card" key={data.id}>
                <Link to={`/artist/${data.id}`}>
                  {data.images[0] ? (
                    <img
                      src={data.images[0].url}
                      alt="artist-img"
                      className="artist-img"
                    />
                  ) : null}
                  <h2>{data.name}</h2>
                </Link>
                <button onClick={() => this.addToFav(`${data.id}`)}>
                  Add to Favorites
                </button>
              </div>
            );
          })}

        {/* Display several favorite artists */}
        {this.state.SeveralArr &&
          this.state.SeveralArr.map((data) => {
            return (
              <div className="artists-card" key={data.id}>
                <Link to={`/artist/${data.id}`}>
                  {data.images[0] ? (
                    <img
                      src={data.images[0].url}
                      alt="artist-img"
                      className="artist-img"
                    />
                  ) : null}
                  <h2>{data.name}</h2>
                </Link>
                <button onClick={() => this.removeFromFav(`${data.id}`)}>
                  Remove from Favorites
                </button>
              </div>
            );
          })}

        {/* Display one artist & related artists */}
        {this.state.oneArt &&
          this.state.oneArt.map((el) => {
            return (
              <div className="artists-card" key={el.id}>
                <Link to={`/artist/${el.id}`}>
                  {el.images && (
                    <img
                      src={el.images[0].url}
                      alt="artist-img"
                      className="artist-img"
                    />
                  )}
                  <h2>{el.name}</h2>
                </Link>
                <button onClick={() => this.removeFromFav(`${el.id}`)}>
                  Remove from favorites
                </button>
              </div>
            );
          })}
        {this.state.relatedArr &&
          this.state.relatedArr.map((el) => {
            return (
              <div className="artists-card" key={el.id}>
                <Link to={`/artist/${el.id}`}>
                  {el.images && (
                    <img
                      src={el.images[0].url}
                      alt="artist-img"
                      className="artist-img"
                    />
                  )}
                  <h2>{el.name}</h2>
                </Link>
                <button onClick={() => this.addToFav(`${el.id}`)}>
                  Add to favorites
                </button>
              </div>
            );
          })}

        {/* Display Random Artists if no favorites */}
        {this.state.randomArtists &&
          this.state.randomArtists.map((el) => {
            return (
              <div className="artists-card" key={el.id}>
                <Link to={`/artist/${el.id}`}>
                  {el.images && (
                    <img
                      src={el.images[0].url}
                      alt="artist-img"
                      className="artist-img"
                    />
                  )}
                  <h2>{el.name}</h2>
                </Link>
                <button onClick={() => this.addToFav(`${el.id}`)}>
                  Add to favorites
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withAuth(Main);
