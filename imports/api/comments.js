import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Comments = new Mongo.Collection('comments')

if (Meteor.isServer) {
    Meteor.publish('comments', function (
        selector = {},
        options = {
          sort: {
              createdAt: -1
          }
      }) {
        Counts.publish(this, 'numberOfComments', Comments.find(selector), {
            noReady: true
        })
        return Comments.find(selector, options)
    })
}

Meteor.methods({
  'comments.insert' (data) {
    check(data.text, String)
    check(data.parent, String)
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Comments.insert({
      text: data.text,
      parent: data.parent,
      createdAt: new Date(),
      author: Meteor.userId()
    })
  }
})
