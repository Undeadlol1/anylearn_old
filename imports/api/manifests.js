import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Manifests = new Mongo.Collection('manifests')

Manifests.schema = new SimpleSchema({
	parent: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		label: 'manifest parent id'
	},
	userId: { // author
		type: String,
		label: 'manifest userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if ( this.isInsert ) return this.userId }
	},
	createdAt: {
		label: 'manifest createdAt',
		type: Date,
		autoValue() { if ( this.isInsert ) return new Date() }
	}
})
Manifests.attachSchema(Manifests.schema)

Meteor.methods({
  'manifests.insert' (parent) {
    check(parent, String)

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    return Manifests.insert({ parent })

  }
})

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('manifests', function manifestsPublication(skillId) {
   check(skillId, String)
   return Manifests.find({parent: skillId})
  })
}
