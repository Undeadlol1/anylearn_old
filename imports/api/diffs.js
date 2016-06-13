import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Diffs = new Mongo.Collection('diffs')

if (Meteor.isServer) {
  Meteor.publish('diffs', function diffsPublication(
    selector = {},
    options = {}
    ) { return Diffs.find(selector, options) })
}

Meteor.methods({
  'diffs.insert' (data) {
    check(data.why, String)
    check(data.exp, String)
    check(data.parent, String)

    // Make sure the user is logged in before inserting
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // do not allow multiple diffs
    if (Diffs.findOne({parent: data.parent, userId: Meteor.userId()})) {
      throw new Meteor.Error('response-already-exists')
    }

    return Diffs.insert({
          why: data.why,
          exp: data.exp,
          parent: data.parent,
          createdAt: new Date(),
          userId: Meteor.userId()
    })
  }
})
