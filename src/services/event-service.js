import axios from "axios";

class EventService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/events`,
      withCredentials: true,
    });
  }

  createEvent = (artistId, userId, changes) => {
    const { title, description, date, participants, location, picture } = changes
    const pr = this.api
    .post(`${artistId}/create`, { creator: userId, title, description, date, participants, location, picture })
    .then( (response) => response.data)

    return pr;
  }

//  getEvent by Artist ID
  getEvent = (artistId) => {
    const pr = this.api
    .get(`/${artistId}`)
    .then( (response) => response.data)
    return pr;
  }

  //getEvent by Event ID

  getEventById = (eventId) => {
    const pr = this.api
    .get(`/one-event/${eventId}`)
    .then((response) => response)
    return pr
  }

}

const eventService = new EventService();

export default eventService;