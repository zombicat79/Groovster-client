import axios from "axios";

// THIS IS AN EXAMPLE THAT YOU CAN USE
// TO CREATE A SERVICE FOR YOUR AXIOS CALLS

class UserService {
  constructor() {
    // this.api  is a reusable axios request base containing the base url (baseURL)
    // of the API and the Headers options ( `withCredentials: true` )
    this.api = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
  }

  /*getAll = () => {
    const pr = this.api.get("/example");

    return pr;
  };*/

  getUser = (id) => {
    const pr = this.api
    .get(`/users/${id}`)
    .then( (response) => response.data)

    return pr;
  };

  modifyUser = (id, changes) => {
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
  };
}

// Create instance (object) containing all axios calls as methods
const userService = new UserService();

export default userService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
