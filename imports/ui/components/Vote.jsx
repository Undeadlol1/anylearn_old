import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import classNames from 'classnames'

class Vote extends Component {
  vote(value, event) {
      event.preventDefault()
      // gather data for method call
      const data = { value, parent: this.props.parent }
      // if user chooses same thing, means he wants to undo his choice
      if (this.props.choice === value) data.value = null
      Meteor.call('votes.choose', data, (err)=>{
        if (err) console.log(err)
      })
  }
  render() {
    const greenIcon = classNames('material-icons', {
      'green-text accent-3': this.props.choice === true
    })
    const redIcon = classNames('material-icons', {
      'deep-orange-text': this.props.choice === false
    })
    return (
      <span {...this.props} className="right" style={{color: this.props.color}}>
        {this.props.likes}
        <span>
          <i onClick={this.vote.bind(this, true)}
            className={greenIcon}>
            thumb_up
          </i>
        </span>
        <span>
          <i onClick={this.vote.bind(this, false)}
            className={redIcon}>
            thumb_down
          </i>
        </span>
        {this.props.dislikes}
      </span>
    )
  }
}
Vote.defaultProps = {
  color: 'white'
}
Vote.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  choice: PropTypes.bool, // choice may be null so it s not required
  color: PropTypes.string,
  parent: PropTypes.string.isRequired // needed for Meteor.call
}

export default Vote
