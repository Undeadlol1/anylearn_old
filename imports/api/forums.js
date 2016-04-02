import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Forums = new Mongo.Collection('forums');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish forums that are public or belong to the current user
  Meteor.publish('forums', function forumsPublication() {
    return Forums.find();
  });
}

Meteor.methods({
  'forums.insert' (data) {
    check(data.parent, String);
    check(data.type, String)

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Forums.insert({
      parent: data.parent,
      type: data.type,
      createdAt: new Date()
    });
  }/*,
  'forums.remove' (taskId) {
    check(taskId, String);

    const task = Forums.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Forums.remove(taskId);
  },
  'forums.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Forums.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Forums.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'forums.setPrivate' (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Forums.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Forums.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }*/
});
