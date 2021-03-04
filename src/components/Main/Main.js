import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "./../../context/auth-context";
import userService from "./../../services/user-service";
require("dotenv").config();

class Main extends Component {
  state = {
    search: " ",
    toggle: false,
    searchArr: [],
    userId: "",
    preferences: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const { search } = this.state;

    axios
      .post("http://localhost:5000/api/spotify/main", { search })
      .then((list) => {
        console.log(list.data.body.artists.items);

        this.setState({ searchArr: list.data.body.artists.items });
      })
      .catch((err) => {
        console.log("here is there error", err);
      });
  };

  submitForm = (event) => {
    event.preventDefault();

    const { search } = this.state;

    axios
      .post("http://localhost:5000/api/spotify/main", { search })
      .then((data) => {
        this.setState({ searchArr: data });
      })
      .catch((err) => {
        console.log("here is there error", err);
      });
  };

  getRandom = () => {
    axios
      .get("http://localhost:5000/api/spotify/main/no-preferences")
      .then((list) => {
        this.setState({ searchArr: list.data.artists });
      })
      .catch((err) => {
        console.log("here is there error", err);
      });
  };

  getRelatedOfOne = () => {
    const userPref = this.props.user.preferences;

    axios
      .post("http://localhost:5000/api/spotify/main/one-preference", {
        userPref,
      })
      .then((list) => {
        if (this.state.searchArr === 0) {
          this.setState({ searchArr: list.data.body.artists });
        } else {
          const expandedArr = [...this.state.searchArr, list.data.body.artists];
          console.log(expandedArr[0]);

          this.setState({ searchArr: expandedArr[0] });
        }
      })
      .catch((err) => {
        console.log("here is there error", err);
      });
  };

  getSeveralArtists = () => {


    const userId = this.props.user._id;
    axios
      .get(`http://localhost:5000/auth/update/${userId}`)
      .then((result) => {
        console.log("the result", result.data.preferences);
        this.setState({ preferences: result.data.preferences });
        const artistsArr = result.data.preferences
        axios
        .post("http://localhost:5000/api/spotify/main/preferences", {
            artistsArr,
        })
        .then((list) => {
          console.log("here", list.data.body.artists);
  
          this.setState({ searchArr: list.data.body.artists });
        })
      })


    const userPref = this.props.user.preferences;
    console.log("userPref getseveralartist", userPref);
    
    axios
      .post("http://localhost:5000/api/spotify/main/preferences", {
        userPref,
      })
      .then((list) => {
        console.log("here", list.data.body.artists);

        this.setState({ searchArr: list.data.body.artists });
      })
  };

  getOneArtist = () => {
    const userPref = this.props.user.preferences;
    axios
      .post("http://localhost:5000/api/spotify/main/singleArtist", { userPref })
      .then((artist) => {
        console.log(artist.data.body);
        this.setState({ searchArr: artist.data.body });
        console.log(this.state.searchArr.images[0].url);
      })
      .catch((err) => console.log(err));
  };

  updatePref = () => {
    this.setStatePref();
    const userPref = this.props.user.preferences;
    console.log("user pref", userPref);
    if (userPref.length === 0) {
      this.getRandom();
    } else if (userPref.length === 1) {
      this.getOneArtist();
    } else if (userPref.length > 1) {
      this.getSeveralArtists();
    }
  };

  addToFav = (artistId) => {
    const user = this.props.user._id;
    userService
      .modifyUser(user, { $push: { preferences: artistId } })
      .then((data) => {
        console.log("user modified");
        this.setStatePref();
      })
      .catch((err) => console.log(err));

    this.updatePref();
  };

  setStatePref = () => {
    const userId = this.props.user._id;
    axios
      .get(`http://localhost:5000/auth/update/${userId}`)
      .then((result) => {
        console.log("the result", result.data.preferences);
        this.setState({ preferences: result.data.preferences });
        console.log("ffff", this.state.preferences);
      })
  };

  componentDidMount() {
    this.updatePref();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input
            name="search"
            type="text"
            placeholder="Who are you looking for?"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button>Find</button>
        </form>

        {this.state.searchArr.map((el) => {
          return (
            <div className="artists-card" key={el.id}>
              <Link to={`/artist/${el.id}`}>
                <img
                  src={el.images[0].url}
                  alt="artist-img"
                  className="artist-img"
                />
                <h2>{el.name}</h2>
              </Link>
              <button onClick={() => this.addToFav(`${el.id}`)}>
                Add to Favorites
              </button>
            </div>
          );
        })}

        {/* <div className="artists-card" key={this.state.searchArr.id}>
                <Link to={`/artist/${this.state.searchArr.id}`}>
                    <img src={images[0].url} alt="artist-img" className="artist-img" />
                    <h2>{name}</h2>
                </Link>
                <button>Add to Favorites</button>
            </div> */}

        <h1>You have no preferences yet check the most popular artists</h1>
        <button>Set your preferences</button>
      </div>
    );
  }
}

export default withAuth(Main);
