import React from 'react'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { createContainer } from 'meteor/react-meteor-data'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Moods } from '../../api/moods'
import { Nodes } from '../../api/nodes'
import { Decisions } from '../../api/decisions'
import MoodPage from '../pages/MoodPage'
import { parseIdfromUrl } from '../../helpers'

export default createContainer(() => {

	const 	slug = FlowRouter.getParam('moodSlug'),
			parent = slug,
			userId = Meteor.userId(),
    		moodsReady = Meteor.subscribe('moods', { slug }).ready(),
			nodesReady = Meteor.subscribe('nodes', { parent }).ready(),
			decisionsReady = Meteor.subscribe('decisions', { userId }).ready(), // {parent}
			count = Nodes.find({}, {reactive: false}).count() // maybe this causes video reload on node submit?

	const randomNumber = new ReactiveVar(_.random(count))
	function setRandomNumber() {
		const previousNumber = randomNumber.get()

		randomNumber.set(_.random(count))
		const newNumber = randomNumber.get()
		if (newNumber == previousNumber && count > 2) {
			console.log('they are the same!')
			return setRandomNumber()
		}

	}
// , reactive: false
	const 	node = Nodes.find({}, {skip: randomNumber.get(), limit: 1}).fetch()[0] || {},
			decision = !_.isEmpty(node) ? Decisions.findOne({ parent: node._id })  || {} : {}



		function decisionOnChange(event) {
			const {value} = event.target
			console.warn('decisionOnChange', value)
			decision.rating = value
			if(value <= -4) newVideoSequence()
		}

		function newVideoSequence() {
			console.warn('callback is invoked!')
			const { rating } = decision

			console.warn(node._id, rating);
			// if(node) { // do i need this check?
				Meteor.call("decisions.upsert", { // set decision rating
						rating,
						parent: node._id // rework node to be parent == mood ._id and not slug // or not?
					},
					(err) => { if(err) Materialize.toast(err.reason, 4000) }
				)
			// }

			setRandomNumber() // invoke new video sequence
		}

	    return {
			slug,
			node,
			decision,
			decisionOnChange,
			// decisionOnChange: newRating => decision.rating = newRating,
			videoCallback: newVideoSequence,
			loaded: moodsReady && nodesReady
	    }
}, MoodPage)
