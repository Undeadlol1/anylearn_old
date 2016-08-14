import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Threads = new Mongo.Collection('threads')

Threads.schema = new SimpleSchema({
	name: {type: String, label: 'thread name'},
	text: {type: String, label: 'thread text'},
	type: {type: String, label: 'thread type', optional: true},
	parent: {type: String, regEx: SimpleSchema.RegEx.Id},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		defaultValue: this.userId
	},
	createdAt: {type: Date}
})
Threads.attachSchema(Threads.schema)
/*Threads.helpers({
	revision() {
		return Revisions.findOne({ parent: this._id, active: true })
	},
	threads() {
		return Threads.find({ parent: this._id, type: "skill" })
	}
})*/

if (Meteor.isServer) {
    Meteor.publish('threads', function threadsPublication(
        selector = {},
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
    // if type of thread specified insert it aswell
    try { thread.type = data.type }
    finally {
      const threadId = Threads.insert(thread)
      Meteor.call('comments.insert', {
        text: data.text,
        parent: threadId
      })
      return threadId
    }
  }
})
