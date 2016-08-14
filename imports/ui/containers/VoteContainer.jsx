import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Votes } from '../../api/votes'
import Vote from '../components/Vote'
import get from 'oget'

const VoteContainer = props => {
    return <Vote {...props}
            likes={props.likes}
            dislikes={props.dislikes}
            choice={props.choice}
            parent={props.parent} />
}

export default createContainer( params => {

	const 	parent = params.parent

	Meteor.subscribe('votes', { parent } )

	const 	likes = Votes.find({ choice: true, parent }).count(),
			dislikes = Votes.find({ choice: false, parent }).count(),
			choice = get(Votes.findOne({ userId: Meteor.userId(), parent }), 'choice')

	return { likes, dislikes, parent, choice }

}, VoteContainer)

VoteContainer.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  choice: PropTypes.bool, // choice may be null so it s not required
  parent: PropTypes.string.isRequired // needed for Meteor.call('votes.choose')
}
