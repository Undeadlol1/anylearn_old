import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Skills = new Mongo.Collection('skills')

if (Meteor.isServer) {
  Meteor.publish('skills', function skillsPublication(
    selector = {},
    options = {
      sort: {
          createdAt: -1
      }
  }) {
    return Skills.find(selector, options)
  })
}

Meteor.methods({
  'skills.insert' (data) {
    check(data.name, String)
    check(data.text, [String])

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    const generatedId = new Mongo.ObjectID()._str
    Meteor.call('forums.insert', generatedId)
    Meteor.call('manifests.insert', generatedId)
    Meteor.call('users.subscribe', generatedId)
    const revisionId = Meteor.call('revisions.insert', {
      name: 'First version',
      text: data.text,
      parent: generatedId,
      description: null,
      previous: null
    })
    return Skills.insert({
          _id: generatedId,
          name: data.name,
          revision: revisionId,
          createdAt: new Date(),
          author: Meteor.userId()
    })
  }
})
