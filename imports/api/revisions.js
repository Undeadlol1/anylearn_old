import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'

export const Revisions = new Mongo.Collection('revisions')

if (Meteor.isServer) {
  Meteor.publish('revisions', function (selector, options) {
      Counts.publish(this, 'numberOfRevisions', Revisions.find(selector), {
          noReady: true
      })
      return Revisions.find(selector, options)
  })
}

Meteor.methods({
  'revisions.insert' (data) {
    check(data.name, String)
    check(data.text, [String])
    check(data.parent, String)
    check(data.description, Match.Maybe(String)) // or just String?

    // Make sure the user is logged in before inserting
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    return Revisions.insert({
      name: data.name,
      text: data.text,
      description: data.description,
      parent: data.parent,
      active: true,
      createdAt: new Date(),
      author: Meteor.userId()
    })
  },
  'revisions.update' (data) {
    check(data.name, String)
    check(data.text, [String])
    check(data.parent, String)
    check(data.previous, String)
    check(data.description, Match.Maybe(String))

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // deactivate current revision
    Revisions.update(data.previous, {
      $set: {
        active: false
      }
    })
    // insert new active revision
    const newRevisionId = Revisions.insert({
      name: data.name,
      text: data.text,
      description: data.description,
      parent: data.parent,
      previous: data.previous,
      active: true,
      author: Meteor.userId(),
      createdAt: new Date()
    })
    // create notification
    Meteor.call('notifications.insert', {
      name: data.name,
      targetId: newRevisionId,
      parent: data.parent,
      type: 'revision',
      author: Meteor.userId()
    })
    return newRevisionId
  }
})
