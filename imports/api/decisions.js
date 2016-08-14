import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { updateRating } from './nodes'

export const Decisions = new Mongo.Collection('decisions')

Decisions.schema = new SimpleSchema({
	rating: {
		type: Number,
		label: 'decision rating',
		defaultValue: 0
	},
	parent: {
		type: String,
		label: 'decision parent id',
		regEx: SimpleSchema.RegEx.Id
	},
	userId: {
		type: String,
		label: 'decision userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if (this.isUpsert) return this.userId }
	},
	createdAt: {
		type: Date,
		label: 'decision createdAt',
		autoValue() { if (this.isUpsert) return new Date() }
	}
})
Decisions.attachSchema(Decisions.schema)

Meteor.methods({
	'decisions.upsert' ({rating, parent}) {
		if(!rating) rating = 0
		console.warn(rating, parent);
		const 	userId = Meteor.userId(),
				previousDecision = Decisions.findOne({ parent, userId })

		Decisions.upsert(
							{ parent, userId },
							{ $set: { rating, parent } }
						)
		if (previousDecision && previousDecision.rating) {
			const previousRating = previousDecision.rating
			let difference = 0
			console.warn('previousRating is ', previousRating);
			console.warn('newRating is ', rating);
			if(previousRating < rating) difference = rating - previousRating
			else difference = previousRating - rating

			// difference = previousRating < 0 ? Math.abs(previousRating) - rating : rating - previousRating
			console.warn('calling updateRating with ', difference);
			rating = difference
		}
		return	updateRating.call( { _id: parent, rating })
	}/*,
	'decisions.insert' (url, parent) {
	    check(url, String)
		check(parent, String)

		const userId = Meteor.userId()
	    // Make sure the user is logged in before inserting a task
	    if (!userId) {
	      throw new Meteor.Error('not-authorized')
	    }
	    // somehow sometimes you bypass name check
	    if (url.trim() === "") {
	      throw new Meteor.Error('url-is-empty')
	    }
		if( Decisions.findOne({url, parent, userId}) ) {
			throw new Meteor.Error('already exist')
		}

	    return Decisions.insert({
			url,
			parent,
			userId,
			createdAt: new Date()
		})
	}*/
})

if (Meteor.isServer) {
  Meteor.publish('decisions', function decisionsPublication(
    selector = {},
    options = {
      sort: {
          createdAt: -1
      }
  }) {
      return Decisions.find(selector, options)
  })
}
