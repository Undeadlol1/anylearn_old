import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Forums = new Mongo.Collection('forums')

Forums.schema = new SimpleSchema({
	name: {
		label: 'forum name',
		type: String,
		optional: true
	},
	parent: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		label: 'forum parent id'
	},
	userId: { // author
		type: String,
		label: 'forum userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if ( this.isInsert ) return this.userId }
	},
	createdAt: {
		label: 'forum createdAt',
		type: Date,
		autoValue() { if ( this.isInsert ) return new Date() }
	}
})
Forums.attachSchema(Forums.schema)

Meteor.methods({
  'forums.insert' (parent, name) {
    //check(parent, String)
    //check(name, Match.Maybe(String))

    if (!Meteor.userId()) throw new Meteor.Error('not-authorized')

	return 	Forums.insert({ parent, name })
  }
})

if (Meteor.isServer) {
  Meteor.publish('forums', function forumsPublication() {
    return Forums.find()
  })
}
