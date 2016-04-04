import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Threads = new Mongo.Collection('threads');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('threads', function threadsPublication() {
    return Threads.find();
  });
}

Meteor.methods({
  'threads.insert' (data) {
    check(data.name, String);
    check(data.text, String);
    check(data.parent, String);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    const threadId = Threads.insert({
      name: data.name,
      parent: data.parent,
      author: Meteor.userId(),
      createdAt: new Date()
    });
    Meteor.call('comments.insert', {
      text: data.text,
      parent: threadId
    })
    return threadId
  }
});
