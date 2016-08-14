import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import classNames from 'classnames'

class Vote extends Component {
  vote(value) { // , event
      //event.preventDefault()
      // gather data for method call
      const data = { value, parent: this.props.parent }
      // if user chooses same thing, means he wants to undo his choice
      if (this.props.choice === value) data.choice = null
      if (!Meteor.userId()) FlowRouter.go('/sign-in')
      else Meteor.call('votes.choose', data,
			(err)=> { if (err) console.log(err) }
		)
  }
  render() {
	const { props } = this
    const greenIcon = classNames('material-icons', {
      'green-text accent-3': props.choice === true
    })
    const redIcon = classNames('material-icons', {
      'deep-orange-text': props.choice === false
    })
    return (
      <span {...props} className="right" style={{color: props.color, cursor: 'pointer'}}>
        <span>
          {props.likes}
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
          {props.dislikes}
        </span>
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
