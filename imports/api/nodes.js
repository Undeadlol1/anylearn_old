import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import helpers from '../helpers.js'

export const Nodes = new Mongo.Collection('nodes')

Nodes.schema = new SimpleSchema({
	content: {
		label: 'node content',
		type: String,
		index: true,
		unique: true
	},
	parent: {
		type: String,
		label: 'node parent id'
	},
	provider: {
		label: 'node provider',
		type: String
	},
	type: {
		label: 'node type',
		type: String
	},
	rating: {
		type: Number,
		label: 'node rating',
		autoValue() { if(this.isInsert) return 0 }
	},
	userId: {
		type: String,
		label: 'node userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if(this.isInsert) return this.userId }
	},
	createdAt: {
		label: 'node createdAt',
		type: Date,
		autoValue() { if(this.isInsert) return new Date() }
	}
})
Nodes.attachSchema(Nodes.schema)


export const nodesInsert = new ValidatedMethod({
	name: 'nodes.insert',
	mixins: [LoggedInMixin],
	checkLoggedInError: {
		error: 'notLogged',
		message: 'You need to login'
	},
	validate: new 	SimpleSchema({
						url: { type: String },
						parent: { type: String }
					}).validator(),
	run({url, parent}) {
		console.warn(helpers.parseUrl(url))
		console.warn(_.extend(helpers.parseUrl(url), {parent}))
		return 	Nodes.insert(
					_.extend(helpers.parseUrl(url), {parent})
				)
	}
})

export const updateRating = new ValidatedMethod({
	name: 'nodes.updateRating',
	mixins: [LoggedInMixin],
	checkLoggedInError: {
		error: 'notLogged',
		message: 'You need to login'
	},
	validate: new 	SimpleSchema({
						_id: 	{ type: String },
						rating: { type: Number }
					}).validator(),
	run({_id, rating}) {
		console.warn('updateRating is being called!')
		console.warn(_id, rating);
		return 	Nodes.update(_id, {
					$inc: { rating }
				})
	}
})


// Meteor.methods({
// 	'nodes.update' ({parent, rating}) {
// 		check(rating, Boolean)
// 		check(parent, String)
//
// 		// Make sure the user is logged in before inserting a task
// 		if (!Meteor.userId()) throw new Meteor.Error('not-authorized')
//
// 		return 	Nodes.update(parent, { // return
// 					$inc: { rating }
// 				})
// 	},
// 	'nodes.nextBest' (selector) {
// 		const count = Nodes.find(selector).count()
// 		return Nodes.find(selector, {skip: _.random(count), limit: 1}).fetch()[0]
// 	}
// })


if (Meteor.isServer) {
	Meteor.publish('nodes', function nodesPublication(
		selector = {},
		options = {
			sort: {
				createdAt: -1
			}
		}) {
			Counts.publish(this, 'numberOfNodes', Nodes.find(selector), {
				noReady: true
			})
			return Nodes.find(selector, options)
		})
}
