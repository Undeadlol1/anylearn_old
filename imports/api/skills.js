import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'

export const Skills = new Mongo.Collection('skills')

Skills.friendlySlugs()

if (Meteor.isServer) {
  Meteor.publish('skills', function skillsPublication(
    selector = {},
    options = {
      sort: {
          createdAt: -1
      }
  }) {
      Counts.publish(this, 'numberOfSkills', Skills.find(selector), {
          noReady: true
      })
      return Skills.find(selector, options)
  })
}

Meteor.methods({
  'skills.getId' (slug) {
    return Skills.findOne({ slug })._id

  },
  'skills.insert' (data) {
    check(data.name, String)
    //check(data.intro, String)
    check(data.text, [String])

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // somehow sometimes you bypass name check
    if (data.name.trim() === "") {
      throw new Meteor.Error('name-is-empty')
    }

    const generatedId = new Mongo.ObjectID()._str
    Meteor.call('forums.insert', generatedId)
    Meteor.call('manifests.insert', generatedId)
    Meteor.call('users.subscribe', generatedId)
    const revisionId = Meteor.call('revisions.insert', {
      name: 'First version',
      description: null,
      text: data.text,
      //intro: data.intro,
      parent: generatedId,
      previous: null
    })
    Skills.insert({
          _id: generatedId,
          name: data.name,
          revision: revisionId,
          createdAt: new Date(),
          author: Meteor.userId()
    })
    return Skills.findOne(generatedId).slug
  }
})
