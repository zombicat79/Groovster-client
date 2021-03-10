import axios from "axios";

class EventService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/events`,
      withCredentials: true,
    });
  }

  createEvent = (artistId, userId, changes) => {
    const { title, description, date, participants } = changes
    const pr = this.api
    .post(`${artistId}/create`, { creator: userId, title, description, date, participants })
    .then( (response) => response.data)

    return pr;
  }

  getEvent = (artistId) => {
    const pr = this.api
    .get(`/${artistId}`)
    .then( (response) => response.data)

    return pr;
  }
}

const eventService = new EventService();

export default eventService;