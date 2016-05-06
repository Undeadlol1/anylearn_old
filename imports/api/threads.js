import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'

export const Threads = new Mongo.Collection('threads')

if (Meteor.isServer) {
    Meteor.publish('threads', function threadsPublication(    selector = {},
        options = {
          sort: {
              createdAt: -1
          }
      }) {
        Counts.publish(this, 'numberOfThreads', Threads.find(selector), {
            noReady: true
        })
        return Threads.find(selector, options)
    })
}

Meteor.methods({
  'threads.insert' (data) {
    check(data.name, String)
    check(data.text, String)
    check(data.parent, String)
    check(data.type, Match.Maybe(String))
    check(data._id, Match.Maybe(String))
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

    const thread = {
      name: data.name,
      text: data.text,
      parent: data.parent,
      author: Meteor.userId(),
      createdAt: new Date()
    }
    // if data specified insert it aswell
    if(data.type) thread.type = data.type
    if(data._id) thread._id = data._id
    const threadId = Threads.insert(thread)
    Meteor.call('comments.insert', {
      text: data.text,
      parent: threadId
    })
    return threadId
  }
})
