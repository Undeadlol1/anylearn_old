import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'

export const Revisions = new Mongo.Collection('revisions')

if (Meteor.isServer) {
  Meteor.publish('revisions', function (
    selector,
    options = { sort: { createdAt: -1 } }
  ) {
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
    // insert revision
    const revisionId = Revisions.insert({
                          name: data.name,
                          text: data.text,
                          description: data.description,
                          parent: data.parent,
                          active: true,
                          createdAt: new Date(),
                          author: Meteor.userId()
                        })
    // insert positive vote for your revision
    Meteor.call('votes.insert', {value: true, parent: revisionId})
    return revisionId
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
    // insert positive vote for your revision
    Meteor.call('votes.insert', {value: true, parent: newRevisionId})
    // create notification
    Meteor.call('notifications.insert', {
      name: data.name,
      targetId: newRevisionId,
      parent: data.parent,
      type: 'revision',
      author: Meteor.userId()
    })
    return newRevisionId
  },
  'revisions.revert' (_id, reason) {
    check(_id, String)
    check(reason, String)

    // Make sure the user is logged in
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized')

    // deactivate current revision
    Revisions.update(_id, {
      $set: {
        active: false,
        reverted: true
      }
    })

    // insert new active revision
    const current = Revisions.findOne(_id)
    const previous = Revisions.findOne({previous: current.previous})
    const newRevisionId = Revisions.insert({
      name: `Отменяет "${current.name}"`,
      description: reason,
      text: previous.text,
      parent: previous.parent,
      previous: previous.previous,
      active: true,
      author: '',
      createdAt: new Date()
    })

    // create notification
    Meteor.call('notifications.insert', {
      name: `Отменяет "${current.name}"`,
      targetId: newRevisionId,
      parent: previous.parent,
      type: 'revision',
      author: Meteor.userId()
    })
    return newRevisionId
}, // i don't know why i created revisions.remove
  'revisions.remove' (_id) {
    check(_id, String)

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    const previousId = Revisions.findOne(_id).previous
    Revisions.update(previousId, { $set: {active: true} })
    Revisions.remove(_id)
  }
})
