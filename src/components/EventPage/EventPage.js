import React, { Component } from "react";
import EventService from "./../../services/event-service";
import { withAuth } from "./../../context/auth-context";
import { withMode } from "./../../context/mode-context";
import userService from "./../../services/user-service";

import backLight from './../../images/go-back-light.png';
import backDark from './../../images/go-back-dark.png'

import './EventPage.css'

export class EventPage extends Component {
  state = {
    event: [],
    participants: [],
    participantsArr: [],
    mode: ""
  };

  handleMode = () => {
    if (this.props.modeIsDark === true) {
      this.setState({ mode: "dark" })
    }
    else {
      this.setState({ mode: "light" })
    }
  }

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
    this.handleMode();
    this.retrieveEvent();    
  }

  filterParticipantId = () => {
    const newArr  = this.state.participants.map((el) => {
      return el._id
    })
    this.setState({participantsArr: newArr})
  }

  render() {
    return (
      <main id={`event-main-${this.state.mode}`}>
        <div>
          <img id={`event-goback-${this.state.mode}`} 
                  src={this.state.mode === "light" ? backLight : backDark}
                  onClick={this.props.history.goBack} />
          <div id={`one-event-container-${this.state.mode}`}>
            <h1 id={`event-title-${this.state.mode}`}>{this.state.event.title}</h1>
            <p><strong>DESCRIPTION:</strong></p>  
            <p>{this.state.event.description}</p>
            <p><strong>PARTICIPANTS:</strong></p>
            <div>
              {this.state.participants.map((el, index) => {
                return <p key={index}>{el.username}</p>;
              })}
            </div>
          </div>
          {this.state.event.creator===this.props.user._id ? 
          <h3 id={`event-creator-${this.state.mode}`}>WOW! YOU CREATED THE EVENT!</h3>
          :
          this.state.participantsArr.includes(this.props.user._id) ? (
            <p>You signed up to that event</p>
          ) : (
            <button id={`join-event-button-${this.state.mode}`} onClick={this.joinEvent}>Join!</button>
          )
          
          }
        </div>
      </main>
    );
  }
}

export default withAuth(withMode(EventPage));
