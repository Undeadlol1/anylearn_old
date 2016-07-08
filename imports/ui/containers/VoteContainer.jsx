import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Votes } from '../../api/votes'
import Vote from '../components/Vote'
import { SubsManager } from 'meteor/meteorhacks:subs-manager'

const VoteContainer = props => {
    return <Vote {...props}
            likes={props.likes}
            dislikes={props.dislikes}
            choice={props.choice}
            parent={props.parent} />
}

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })

export default createContainer( params => {
  const parent = params.parent

  subsManager.subscribe('votes', { parent } )

  let likes = Votes.find({ value: true, parent }).count()
  let dislikes = Votes.find({ value: false, parent }).count()
  let choice = Votes.findOne({ author: Meteor.userId(), parent })

  return {
      likes, dislikes, parent,
      choice: choice ? choice.value : null
  }
}, VoteContainer)

VoteContainer.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  choice: PropTypes.bool, // choice may be null so it s not required
  parent: PropTypes.string.isRequired // needed for Meteor.call('votes.choose')
}
