import React, { Component } from 'react'

 class ProfilePage extends Component {
    render() {
        return (
            <div className="profile-container">
                <h1>Profile Page </h1>
                <button className="back-btn-chat" onClick={this.props.history.goBack}>
                   ⇦
                </button>
            </div>
        )
    }
}

export default ProfilePage
