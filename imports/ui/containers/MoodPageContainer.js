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



// export default class MoodIndexPageContainer extends React.Component {
//     state = {
//         moods: [],
//         nodes: [],
//         loading: true
//     }
//
//     componentWillMount() {
//         $.get( `api/moods`, data => {
//             this.setState({
//                 moods: JSON.parse(data),
//                 loading: false
//             })
//         })
//         $.get(`api/nodes`, data => {
//             this.setState({
//                 nodes: JSON.parse(data)
//             })
//         })
//     }
//
//     render() {
//         const {state} = this
//         return <MoodPage moods={state.moods} nodes={state.nodes} loading={state.loading} />
//     }
// }



// http://stackoverflow.com/a/6360583 (How to find min value in mongodb)
export default createContainer(() => {

	const 	slug = FlowRouter.getParam('moodSlug'),
			parent = slug,
			userId = Meteor.userId(),
    		moodsReady = Meteor.subscribe('moods', { slug }).ready(),
			nodesReady = Meteor.subscribe('nodes', { parent }).ready(),
			decisionsReady = Meteor.subscribe('decisions', { userId }).ready(), // {parent}
			count = Nodes.find({}, {reactive: false}).count() // maybe this causes video reload on node submit?

	let node = {}, decision = {}

	function loadNewVideo() {
		console.log('loadNewVideo is callled!')
		console.log('Previous node is', node);
		console.log('Previous decision is', decision)
		if(!_.isEmpty(decision)) {
			console.warn('calling decisions.upsert!')
			const { rating } = decision
			Meteor.call(
				"decisions.upsert", { // set decision rating
					rating,
					parent: node._id // rework node to be parent == mood ._id and not slug // or not?
				},
				(err) => {if(err) Materialize.toast(err.reason, 4000)}
			)
		}
		node =  Nodes.find({}, {sort: {nextViewAt: 1}, limit: 1}).fetch()[0] || {}
		decision = !_.isEmpty(node) ? Decisions.findOne({ parent: node._id })  || {} : {}
		console.info('New node is', node)
		console.info('New decision is', decision)
		// setRandomNumber() // invoke new video sequence
	}

	loadNewVideo()







	// component callback function
	// function decisionOnChange({target: {value}}) {
	// 	decision.rating = value
	// 	if(value <= -4) loadNewVideo()
	// }








	// const randomNumber = new ReactiveVar(_.random(count))
	//
	// // invoke new Video sequence
	// function setRandomNumber() {
	// 	const previousNumber = randomNumber.get() // do i need this?
	// 	randomNumber.set(_.random(count))
	// 	const newNumber = randomNumber.get()
	// 	if (newNumber == previousNumber && count > 2) {
	// 		console.log('they are the same!')
	// 		return setRandomNumber()
	// 	}
	// 	else throw new Meteor.Error('not enough videos to cicle')
	//
	// }
	//
	// // TODO: rework this to make a normal setter function for node?
	// // ie. setNewNode()
	// function setNewNode() {
	// 	// node =  Nodes.find({}, {sort: {nextViewAt: 1}, limit: 1}).fetch()[0] || {}
	// }
	//
	//
	// // find node with closest date of nextViewAt
	// const node =  Nodes.find({}, {sort: {nextViewAt: 1}, limit: 1}).fetch()[0] || {},
	// // find single random node
	// // const 	node = Nodes.find({}, {skip: randomNumber.get(), limit: 1}).fetch()[0] || {},
	// 		decision = !_.isEmpty(node) ? Decisions.findOne({ parent: node._id })  || {} : {}
	//
	// // component callback function
	// function decisionOnChange(event) {
	// 	const {value} = event.target
	// 	console.warn('decisionOnChange', value)
	// 	decision.rating = value
	// 	if(value <= -4) newVideoSequence()
	// }
	//
	// function newVideoSequence() {
	// 	console.warn('callback is invoked!')
	// 	const { rating } = decision
	//
	// 	// http://stackoverflow.com/a/6360583
	//
	// 	console.warn(node._id, rating);
	// 	// if(node) { // do i need this check?
	// 		Meteor.call("decisions.upsert", { // set decision rating
	// 				rating,
	// 				parent: node._id // rework node to be parent == mood ._id and not slug // or not?
	// 			},
	// 			(err) => { if(err) Materialize.toast(err.reason, 4000) }
	// 		)
	// 	// }
	//
	// 	setRandomNumber() // invoke new video sequence
	// }

    return {
		slug,
		node,
		decision,
		decisionOnChange: 	function (rating) {
								console.log('rating is:', rating)
								console.log(typeof rating)
								if (typeof rating == 'string') {
									// somehow this function is being called twice: with rating and with event (probably material ui bug)
									decision.rating = rating
									if(rating <= -4) loadNewVideo()
								}
							},
		videoCallback: loadNewVideo,
		loaded: moodsReady && nodesReady && decisionsReady
    }
}, MoodPage)
