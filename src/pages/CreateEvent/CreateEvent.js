import React, { Component } from 'react'
import { withAuth } from '././../../context/auth-context';
import eventService from './../../services/event-service';
import userService from './../../services/user-service';

class CreateEvent extends Component {
    state = {
        eventTitle: "",
        eventDescription: "",
        eventDate: "",
        participantSearch: "",
        searchResults: [],
        eventParticipants: []
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
        const {eventTitle, eventDate, eventDescription, participantSearch, eventParticipants} = this.state

        eventService.createEvent(artistId, userId, {title: eventTitle, description: eventDescription, date: eventDate, participants: eventParticipants})
        .then( (data) => {
            this.setState({eventTitle: "", eventDate: "", eventDescription: "", eventParticipants})
        });
    }

    addEventParticipant = (event) => {
        event.preventDefault();
        const { value } = event.target;
        const updatedEventParticipants = [...this.state.eventParticipants, value]
        this.setState({eventParticipants: updatedEventParticipants})
    }
    
    render() {
        return (
            <div>
                <form>
                    <label>Title:</label>
                    <input type="text" name="eventTitle" 
                    value={this.state.eventTitle} onChange={(event) => this.handleChange(event)} />

                    <label>Description:</label>
                    <input type="textarea" name="eventDescription"
                    value={this.state.eventDescription} onChange={(event) => this.handleChange(event)} />

                    <label>Date</label>
                    <input type="text" name="eventDate" placeholder="dd/mm/yyyy"
                    value={this.state.eventDate} onChange={(event) => this.handleChange(event)} />

                    <h3>Search for participants:</h3>
                    <input type="text" name="participantSearch" 
                    value={this.state.participantSearch} onChange={(event) => this.handleChange(event)} />    

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