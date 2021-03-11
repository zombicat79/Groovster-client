import React, { Component } from "react";
import EventService from "./../../services/event-service";
import { withAuth } from "./../../context/auth-context";
import userService from "./../../services/user-service";

export class EventPage extends Component {
  state = {
    event: [],
    participants: [],
  };

  retrieveEvent = () => {
    const { id } = this.props.match.params;
    console.log(id);

    EventService.getEventById(id)
      .then((data) => {
        this.setState({
          event: data.data,
          participants: data.data.participants,
        });
      })
      .catch((err) => console.log(err));
  };

//   joinEvent = () => {
//     const eventId = this.state.event._id;
//     const userId = this.props.user._id;
    

//     EventService.updateEvent(eventId, { $push: { participants: userId }})
//     .then(console.log("success"));
//   };

  componentDidMount() {
    this.retrieveEvent();
  }
  render() {
    console.log("this.state.participants", this.state.participants);
    console.log("this.props.user._id", this.props.user._id);


    return (
      <div className="event-page">
        <button className="back-btn-chat" onClick={this.props.history.goBack}>
          ⇦
        </button>
        <h1> Event Page </h1>
        <p>Title: {this.state.event.title}</p>
        <p>description: {this.state.event.description}</p>
        <ul>
          {this.state.participants.map((el, index) => {
            return <li key={index}>{el.username}</li>;
          })}
        </ul>

        {this.state.participants.includes(this.props.user._id) ? (
          <p>You signed up to that event</p>
        ) : (
          <button onClick={this.joinEvent}>Join the event!</button>
        )}
      </div>
    );
  }
}

export default withAuth(EventPage);
