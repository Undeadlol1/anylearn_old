import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Responses = new Mongo.Collection('responses')

if (Meteor.isServer) {
  Meteor.publish('responses', function responsesPublication(
    selector = {},
    options = {
      sort: {
          createdAt: -1
      }
  }) {
    return Responses.find(selector, options)
  })
}

Responses.schema = new SimpleSchema({
	why: {type: String},
	exp: {type: String},
	parent: {type: String, regEx: SimpleSchema.RegEx.Id},
	userId: {type: String, regEx: SimpleSchema.RegEx.Id},
	createdAt: {type: Date}
})
Responses.attachSchema(Responses.schema)

/*Responses.helpers({
	revision() {
		return Revisions.findOne({ parent: this._id, active: true })
	},
	threads() {
		return Threads.find({ parent: this._id, type: "skill" })
	}
})*/

Meteor.methods({
  'responses.insert' (data) {
    check(data.why, String)
    check(data.exp, String)
    check(data.parent, String)

    // Make sure the user is logged in before inserting
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // do not allow multiple responses
    if (Responses.findOne({parent: data.parent, userId: Meteor.userId()})) {
      throw new Meteor.Error('response-already-exists')
    }

    return Responses.insert({
          why: data.why,
          exp: data.exp,
          parent: data.parent,
          createdAt: new Date(),
          userId: Meteor.userId()
    })
  }
})
