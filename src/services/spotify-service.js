import axios from "axios";

class SpotifyService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  getArtist = (id) => {
    const pr = this.api
    .get(`/spotify/artist/${id}`)
    .then( (response) => response.data.body)

    return pr;
  };

  /* getUser = (id) => {
    const pr = this.api
    .get(`/users/${id}`)
    .then( (response) => response.data)

    return pr;
  };

  modifyUser = (id, changes) => {
    console.log(changes)
    const pr = this.api
    .put(`/users/${id}`, changes)
    .then( (response) => response.data)

    return pr;
  };

  deleteUser = (id) => {
    const pr = this.api
    .delete(`/users/${id}`)
    .then( (response) => response.data)

    return pr;
  }; */
}

// Create instance (object) containing all axios calls as methods
const spotifyService = new SpotifyService();

export default spotifyService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.