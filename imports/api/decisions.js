import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { updateRating } from './nodes'

export const Decisions = new Mongo.Collection('decisions')

Decisions.schema = new SimpleSchema({
	rating: {
		type: Number,
		label: 'decision.rating',
		defaultValue: 0
	},
	nextViewAt: {
		type: String,
		label: 'decision.nextViewAt'
	},
	parent: {
		type: String,
		label: 'decision parent id',
		regEx: SimpleSchema.RegEx.Id
	},
	viewed: {
		type: [Date],
		optional: true
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





/*
	Set Decision's new nextViewAt based on rating, number of views (documents in collection?),
	using this formula: Y=2X+1
	where:
	y - time to next view
	x - days since lastview
*/
// зарисовки

let previousView = Date.now()
previousView = 1472667881732
let currentView = Date.now()
// const difference = previousView - currentView
// const nextView = 2 * difference + 1 // or difference*2 - 1 ?
function showNextview() {
	let difference = currentView - previousView
	let nextView = 2 * difference + 1 // or difference*2 - 1 ?
	nextView += currentView
	// console.warn('previousView', previousView);
	// console.warn('nextView', nextView);
	// console.warn(new Date(nextView));
}
showNextview()
previousView = 1422667841732
showNextview()
/*

*/

// TODO add comments
function calculateNextViewAt(previousView = Date.now(), rating) {
	const difference = Date.now() - previousView
	return 2 * difference - previousView
}

Meteor.methods({
	'decisions.upsert' ({rating, parent}) {
		if(!rating) rating = 0
		const 	userId = Meteor.userId(),
				previousDecision = Decisions.findOne({ parent, userId }),
				nextViewAt = calculateNextViewAt(previousDecision.nextViewAt) // nextViewAt ???

		Decisions.upsert(
							{ parent, userId },
							{
								$set:
								{
									parent,
									nextViewAt,
									rating: Number(rating)
								}
							}
						)

		if (previousDecision && previousDecision.rating) {
			const 	previousRating = previousDecision.rating
			let 	difference = 0
			if(previousRating < rating) difference = rating - previousRating
			else difference = previousRating - rating
			rating = difference
		}
		// update parent node with new rating
		return	updateRating.call( { _id: parent, rating })
	}
})

if (Meteor.isServer) {
  Meteor.publish('decisions', function decisionsPublication(
    selector = {},
    options = { sort: { createdAt: -1 } }
  ) { return Decisions.find(selector, options) })
}
