import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
require("dotenv").config();
// const SpotifyWebApi = require("spotify-web-api-node");

// const spotifyApi = new SpotifyWebApi({

//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
// });

// spotifyApi
//   .clientCredentialsGrant()
//   .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
//   .catch((error) =>
//     console.log("Something went wrong when retrieving an access token", error));

class Main extends Component {
  state = {
    search: " ",
    toggle: false,
    searchArr: [],
    userId: "",
    preferences: [],
  };

//   componentDidMount(){
//       axios.get('http://localhost:5000/api/spotify/user')
//       .then((user) => {
//           console.log(user);
          
//           const pref = user.preferences
//           console.log('yes1');

//           this.setState({preferences: pref})
//           console.log('yes2');

//       })
//   }

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

  preferences = () => {
    if (this.preferences.length === 0) {
      axios
        .post("http://localhost:5000/api/spotify/main/no-preferences")
        .then((list) => {
          this.setState({ searchArr: list.data.body.artists.items });
        })
        .catch((err) => {
          console.log("here is there error", err);
        });
    } else if (this.preferences.length === 1) {

    //   axios.post("http://localhost:5000/api/spotify/main/one-preference", {});
    }
  };

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
                <img src={el.images[0].url} alt="artist-img" />
                <h2>{el.name}</h2>
              </Link>
              <button>Add to Favorites</button>
            </div>
          );
        })}

        <h1>You have no preferences yet check the most popular artists</h1>
        <button>Set your preferences</button>
      </div>
    );
  }
}

export default Main;
