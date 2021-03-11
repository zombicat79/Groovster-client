import React, { Component } from "react";
import EventService from "./../../services/event-service";
import { withAuth } from "./../../context/auth-context";

export class EventPage extends Component {
  state = {
    event: [],
    participants: [],
    participantsArr: [],
  };

  retrieveEvent = () => {
    const { id } = this.props.match.params;
    EventService.getEventById(id)
      .then((data) => {
        this.setState({
          event: data.data,
          participants: data.data.participants,
        });
        this.filterParticipantId();
      })
      .catch((err) => console.log(err));
  };

  joinEvent = () => {
    const eventId = this.state.event._id;
    const userId = this.props.user._id;
    
    EventService.updateEvent(eventId, { $push: { participants: userId }})
    .then((response) => this.retrieveEvent());
  };

  componentDidMount() {
    this.retrieveEvent();    
  }

  filterParticipantId = () => {
    const newArr  = this.state.participants.map((el) => {
      return el._id
    })
    this.setState({participantsArr: newArr})
  }


  render() {
    console.log('this.state.event.creator', this.state.event.creator)
    console.log('this.props.user_id', this.props.user._id)

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

        {this.state.event.creator===this.props.user._id ? 
        <h3>YOU CREATED THE EVENT</h3>
        :
        this.state.participantsArr.includes(this.props.user._id) ? (
          <p>You signed up to that event</p>
        ) : (
          <button onClick={this.joinEvent}>Join the event!</button>
        )
        
        }

      </div>
    );
  }
}

export default withAuth(EventPage);
