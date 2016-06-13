import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Votes } from '../../api/votes'
import Vote from '../components/Vote'

class SkillsListContainer extends Component {
  render() {
    return <Vote {...this.props}
            likes={this.props.likes}
            dislikes={this.props.dislikes}
            choice={this.props.choice}
            parent={this.props.parent}/>
  }
}

export default createContainer( params => {
  const parent = params.parent
  Meteor.subscribe('votes', { parent } )

  let likes = Votes.find({ value: true, parent }).count()
  let dislikes = Votes.find({ value: false, parent }).count()
  let choice = Votes.findOne({ author: Meteor.userId(), parent })
  return {
    likes,
    dislikes,
    parent,
    choice: choice ? choice.value : null
  }
}, SkillsListContainer)

SkillsListContainer.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  choice: PropTypes.bool, // choice may be null so it s not required
  parent: PropTypes.string.isRequired // needed for Meteor.call('votes.choose')
}
