import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

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
