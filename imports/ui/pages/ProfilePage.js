import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'


class ProfilePage extends Component {
    constructor(params){
        super(params)
        this.state = {loaded: false}
    }
  _loginWith(serviceName) {
      //Meteor.linkWith(serviceName)
  }
  componentDidMount() {
      this.setState({loaded: true})
  }
  render() {
    return this.state ? (
      <div>
          <h1>Link accounts!</h1>
          <h2>Does not work yet :(</h2>
          <button onClick={this._loginWith.bind(this, 'facebook')}>Facebook</button>
          <button onClick={this._loginWith.bind(this, 'twitter')}>Twitter</button>
          <button onClick={this._loginWith.bind(this, 'vk')}>Vkontakte</button>
      </div>
    ) : <Loading />
  }
}

ProfilePage.propTypes = {
 // parent: PropTypes.string.isRequired,
 // loaded: PropTypes.bool.isRequired,
 // revisions: PropTypes.array.isRequired,
 // threads: PropTypes.array.isRequired,
 // numberOfThreads: PropTypes.number.isRequired,
 // numberOfRevisions: PropTypes.number.isRequired
}

export default ProfilePage
