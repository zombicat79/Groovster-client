import axios from "axios";

class UserService {
  constructor() {
    // this.api  is a reusable axios request base containing the base url (baseURL)
    // of the API and the Headers options ( `withCredentials: true` )
    this.api = axios.create({
      baseURL: "http://localhost:5000/api/users",
      withCredentials: true,
    });
  }

  getByUsername = (value) => {
    const pr = this.api
    .get(`/search/${value}`)
    .then( (response) => response.data)

    return pr;
  }

  getUser = (id) => {
    const pr = this.api
    .get(`/${id}`)
    .then( (response) => response.data)

    return pr;
  };

  modifyUserChat = (id, changes) => {
    console.log(changes);
    
    const pr = this.api
    .put(`/${id}/${changes}`, changes)
    .then( (response) => response.data)
    return pr;
  };

  modifyUser = (id, changes) => {
    console.log(changes)
    const pr = this.api
    .put(`/${id}`, changes)
    .then( (response) => response.data)

    return pr;
  };

  deleteUser = (id) => {
    const pr = this.api
    .delete(`/${id}`)
    .then( (response) => response.data)

    return pr;
  };


}

// Create instance (object) containing all axios calls as methods
const userService = new UserService();

export default userService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
