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

  getAlbum = (id) => {
    const pr = this.api
    .get(`/spotify/artist/album/${id}`)
    .then( (response) => response.data.body)
    return pr;
  }

  getTopTracks = (id) => {
    const pr = this.api
    .get(`/spotify/artist/top-tracks/${id}`)
    .then( (response) => response.data.body)
    return pr;
  }

  getAlbumTracks = (id) => {
    const pr = this.api
    .get(`/spotify/artist/album/track/${id}`)
    .then( (response) => response.data.body.items)
    return pr;
  }
}

// Create instance (object) containing all axios calls as methods
const spotifyService = new SpotifyService();

export default spotifyService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.