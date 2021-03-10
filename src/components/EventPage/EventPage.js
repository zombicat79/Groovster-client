import React, { Component } from "react";
import EventService from "./../../services/event-service";
import { withAuth } from "./../../context/auth-context";

export class EventPage extends Component {
  state = {
    event: [],
  };

  retrieveEvent = () => {
    const { id } = this.props.match.params;
    console.log(id);

    EventService.getEventById(id)
      .then((data) => {
        console.log(data);
        this.setState({ event: data.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.retrieveEvent();
  }
  render() {
    return (
      <div className="event-page">
        <button className="back-btn-chat" onClick={this.props.history.goBack}>
          ⇦
        </button>
        <h1> Event Page </h1>
        <p>description: {this.state.event.title}</p>
        <p>description: {this.state.event.description}</p>
        <button>Join the event!</button>
      </div>
    );
  }
}

export default withAuth(EventPage);
