import React from 'react'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { createContainer } from 'meteor/react-meteor-data'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Moods } from '../../api/moods'
import { Nodes } from '../../api/nodes'
import { Decisions } from '../../api/decisions'
import Decision from '../components/Decision'
import { parseIdfromUrl } from '../../helpers'

export default createContainer(() => {

	const 	slug = FlowRouter.getParam('moodSlug'),
			parent = slug,
			userId = Meteor.userId(),
    		moodsReady = Meteor.subscribe('moods', { slug }).ready(),
			nodesReady = Meteor.subscribe('nodes', { parent }).ready(),
			decisionsReady = Meteor.subscribe('decisions', { userId }).ready(), // {parent}
			count = Nodes.find().count() // maybe this causes video reload on node submit?

	// const 	reactiveNode = new ReactiveVar({}),
	// 		node = reactiveNode.get(),
	// 		decision = !_.isEmpty(node) ? Decisions.findOne({ parent: node._id }) : {}

/*                    */

	const randomNumber = new ReactiveVar(_.random(count))
	function setRandomNumber() {
		console.warn('setRandomNumber!')
		console.warn(randomNumber.get())
		const previousNumber = randomNumber.get()

		randomNumber.set(_.random(count))
		const newNumber = randomNumber.get()
		if (newNumber == previousNumber && count > 2) {
			console.log('they are the same!')
			return setRandomNumber()
		}
		console.log(newNumber, previousNumber)
		console.warn(randomNumber.get())
	}

	const 	node = Nodes.find({}, {skip: randomNumber.get(), limit: 1}).fetch()[0] || {},
			decision = !_.isEmpty(node) ? Decisions.findOne({ parent: node._id })  || {} : {}

	    return {
			slug,
			node,
			decision,
			getNewVideo: ()=> {
				console.warn('callback is invoked!');
				setRandomNumber()
			},
			loaded: moodsReady && nodesReady
	    }
}, Decision)
