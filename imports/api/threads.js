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

    const generatedId = new Mongo.ObjectID()._str;
    Meteor.call('comments.insert', {
      text: data.text,
      parent: generatedId
    })
    Threads.insert({
      id: generatedId,
      name: data.name,
      parent: data.parent,
      author: Meteor.userId(),
      createdAt: new Date()
    });
  }/*,
  'threads.remove' (taskId) {
    check(taskId, String);

    const task = Threads.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Threads.remove(taskId);
  },
  'threads.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Threads.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Threads.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'threads.setPrivate' (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Threads.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Threads.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }*/
});
