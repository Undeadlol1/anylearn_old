import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Threads = new Mongo.Collection('threads');

if (Meteor.isServer) { //_id
  Meteor.publish('threads', function threadsPublication(parent) {
    return Threads.find({parent})
  //    return Threads.find()
  });
}

Meteor.methods({
  'threads.insert' (data) {
    check(data.name, String)
    check(data.text, String)
    check(data.parent, String)
    check(data._id, Match.Maybe(String))

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const thread = {
      name: data.name,
      text: data.text,
      parent: data.parent,
      author: Meteor.userId(),
      createdAt: new Date()
    }
    if(data._id) thread._id = data._id
    const threadId = Threads.insert(thread)
    Meteor.call('comments.insert', {
      text: data.text,
      parent: threadId
    })
    return threadId
  }
});
