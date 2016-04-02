import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('comments', function commentsPublication() {
    return Comments.find();
  });
}

Meteor.methods({
  'comments.insert' (data) {
    check(data.text, String);
    check(data.parent, String);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.insert({
      text: data.text,
      parent: data.parent,
      createdAt: new Date(),
      author: Meteor.userId()
    });
  }/*,
  'comments.remove' (taskId) {
    check(taskId, String);

    const task = Comments.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Comments.remove(taskId);
  },
  'comments.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Comments.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Comments.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'comments.setPrivate' (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Comments.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }*/
});
