import React, { Component } from 'react'
import { withAuth } from '././../../context/auth-context';
import eventService from './../../services/event-service';
import userService from './../../services/user-service';

import axios from 'axios';

import defaultImage from './../../images/groovster-logo.png'

class CreateEvent extends Component {
    state = {
        eventTitle: "",
        eventDescription: "",
        eventDate: "",
        eventImage: defaultImage,
        participantSearch: "",
        searchResults: [],
        eventParticipants: [],
        eventLocation: "",
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "participantSearch") {
            userService.getByUsername(value)
            .then( (data) => {
                this.setState({ participantSearch: value, searchResults: data })
            })
        }
        else {
            this.setState({ [name]: value })
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const artistId = this.props.match.params.id;
        const userId = this.props.user._id
        const {eventTitle, eventDate, eventDescription, eventImage, eventParticipants, eventLocation} = this.state

        eventService.createEvent(artistId, userId, {title: eventTitle, description: eventDescription, date: eventDate, picture: eventImage, participants: eventParticipants, location: eventLocation})
        .then( (data) => {
            this.setState({eventTitle: "", eventDate: "", eventDescription: "", eventImage: this.state.eventImage, eventParticipants, eventLocation:""})
        });
        this.props.history.push(`/artist/${artistId}`)

    }

    handleImageUpload = (event) => {
        const file = event.target.files[0]; // we get the uploaded image

        const uploadData = new FormData();
        uploadData.append('image', file);

        // we send the photo to the route that uploads it to Cloudinary
        axios.post(`${process.env.REACT_APP_API_URL}/api/users/photo`, uploadData, { withCredentials: true })
        .then( (response) => {
            const {imageUrl} = response.data;
            this.setState({ eventImage: imageUrl })
        })
        .catch( (err) => console.log(err));
    }

    addEventParticipant = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const updatedEventParticipants = [...this.state.eventParticipants, value]
        this.setState({eventParticipants: updatedEventParticipants})
    }
    
    render() {
        return (
            <div className="create-form-container">
                <form>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="eventTitle" 
                        value={this.state.eventTitle} onChange={(event) => this.handleChange(event)} />
                    </div>

                    <div>
                        <label>Description:</label>
                        <input type="textarea" name="eventDescription"
                        value={this.state.eventDescription} onChange={(event) => this.handleChange(event)} />
                    </div>

                    <div>
                        <label>Date</label>
                        <input type="text" name="eventDate" placeholder="dd/mm/yyyy"
                        value={this.state.eventDate} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div>
                        <label>Picture</label>
                        <img src={this.state.eventImage} />
                        <input type="file" name="image" onChange={this.handleImageUpload} />
                    </div>

                    <div>
                    <label>Location</label>
                    <input type="text" name="eventLocation" 
                    value={this.state.eventLocation} onChange={(event) => this.handleChange(event)} />
                    </div>

                    <div>
                        {this.state.searchResults.map((oneResult, i) => {
                           return (
                            <div key={oneResult._id}>
                                <p>{oneResult.username}</p>
                                <button onClick={(event) => this.addEventParticipant(event)} 
                                name="addParticipant" value={oneResult._id}>Add</button>
                            </div>)
                        })}
                    </div>

                    <button onClick={(event) => this.handleFormSubmit(event)} type="submit">Create</button>
                </form>
            </div>
        )
    }
}

export default withAuth(CreateEvent);