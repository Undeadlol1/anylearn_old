import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, match } from 'meteor/check';

export const Revisions = new Mongo.Collection('revisions');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('revisions', function revisionsPublication() {
    return Revisions.find();
  });
}

Meteor.methods({
  'revisions.insert' (data) {
    check(data.name, String);
    check(data.text, [String, String, String, String]);
    check(data.parent, String);
    check(data.description, match.Maybe(String));

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Revisions.insert({
      name: data.name,
      text: data.text,
      parent: data.parent,
      active: true,
      createdAt: new Date(),
      author: Meteor.userId()
    });
  },
  'revisions.update' (data) {
    check(data.name, String);
    check(data.text, [String, String, String, String]);
    check(data.parent, String);
    check(data.previous, String);
    check(data.description, match.Maybe(String));

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Revisions.update(data.previous, {
      $set: {
        active: false//,
      //  text: data.previousText
      }
    })
    return Revisions.insert({
      name: data.name,
      text: data.text,
      description: data.description,
      parent: data.parent,
      previous: data.previous,
      active: true,
      author: Meteor.userId(),
      createdAt: new Date()
    });
  }/*,
  'revisions.remove' (taskId) {
    check(taskId, String);

    const task = Revisions.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Revisions.remove(taskId);
  },
  'revisions.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Revisions.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Revisions.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'revisions.setPrivate' (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Revisions.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Revisions.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }*/
});
