import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Manifests = new Mongo.Collection('manifests')

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('manifests', function manifestsPublication(skillId) {
   check(skillId, String)
   return Manifests.find({parent: skillId})
  })
}

Meteor.methods({
  'manifests.insert' (forumId) {
    check(forumId, String)

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    return Manifests.insert({
      parent: forumId,
      createdAt: new Date(),
      author: Meteor.userId()
    })
  }
})
