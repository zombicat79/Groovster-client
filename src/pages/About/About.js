import React from 'react'
import { withAuth } from './../../context/auth-context'
import { withMode } from './../../context/mode-context'

import './../../App.css'
import './About.css';

import ironhack from './../../images/logo-ironhack-blue.png';
import davidLight from './../../images/david-light.png';
import davidDark from './../../images/david-dark.jpeg';
import clementLight from './../../images/clement-light.png';
import clementDark from './../../images/clement-dark.png';

class About extends React.Component {
  state = {
    mode: ""
  }

  handleMode = () => {
    if (this.props.modeIsDark === true) {
      this.setState({ mode: "dark" })
    }
    else {
      this.setState({ mode: "light" })
    }
  }

  componentDidMount() {
    this.handleMode();
  }

  render() {
    return (
      <main id={`about-main-${this.state.mode}`} className={`main-${this.state.mode}`}>
        <div className={`page-margin-${this.state.mode}`}> 
          <h1 id={`app-name-${this.state.mode}`}>Groovster</h1>
          <h2 className={`regular-text-${this.state.mode}`}>...is a minimal social network for music lovers allowing users to meet fellow band/artist fanatics and connect with them </h2>
          <ul id={`bullet-point-${this.state.mode}`}>
            <li>Profile creation and updating</li>
            <li>Album/track browsing according to preferences (via Spotify API)</li>
            <li>Band/artist event listing and creation</li>
            <li>Band/artist dedicated chatrooms (Socket.IO)</li>
          </ul>
          <p className={`regular-text-${this.state.mode}`}>This app was built during the Ironhack BCN Jan-21 Web Development Bootcamp by:</p>
        </div>
        <div className={`page-margin-${this.state.mode}`} id={`personal-link-container-${this.state.mode}`}>
            <a href="https://www.linkedin.com/in/clement-vallat/" target="blank">
                <h3>Clément Vallat</h3>
                <img id={`picture-clement-${this.state.mode}`} src={this.state.mode === "light" ? clementLight : clementDark} alt="img-clement"/>
            </a>
            <a href="https://www.linkedin.com/in/david-castejon-ferrer/" target="blank">
                <h3>David Castejón</h3>
                <img id={`picture-david-${this.state.mode}`} src={this.state.mode === "light" ? davidLight : davidDark}  alt="img-david"/>
            </a>
        </div>
        <div className={`page-margin-${this.state.mode}`}>
            <a href="https://www.ironhack.com/en" target="blank">
                <img id={`ironhack-logo-${this.state.mode}`} src={ironhack} alt="img-ironhack"/>
            </a>
        </div>
      </main>
    )
  }
}

export default withAuth(withMode(About));