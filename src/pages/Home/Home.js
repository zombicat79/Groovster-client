import React from 'react'
import { withAuth } from './../../context/auth-context'
import { withMode } from './../../context/mode-context'

class Home extends React.Component {
  state = {
    mode: "light"
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
      <div id="cover-background" className={this.state.mode}> 
        <h1 id="main-title">Groovster</h1>
        <h2 id="motto">Meet with other band fanatics</h2>
      </div>
    )
  }
}

export default withAuth(withMode(Home));