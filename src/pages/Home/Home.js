import React from 'react'
import { withAuth } from './../../context/auth-context'
import { withMode } from './../../context/mode-context'
import { Link } from 'react-router-dom';

class Home extends React.Component {
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
      <main id={`cover-background-${this.state.mode}`} className={this.state.mode}>
        <div> 
          <h1 id={`main-title-${this.state.mode}`}>Groovster</h1>
          <h2 id={`motto-${this.state.mode}`}>Meet with other band fanatics</h2>
        </div>
        {this.props.isLoggedIn 
        ? (<Link to="/main">
          <input id={`browse-button-${this.state.mode}`} value="Browse!" />
        </Link>)
        : null}
      </main>
    )
  }
}

export default withAuth(withMode(Home));