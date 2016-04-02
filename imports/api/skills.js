import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Skills = new Mongo.Collection('skills');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('skills', function skillsPublication() {
    return Skills.find();
  });
}

Meteor.methods({
  'skills.insert' (data) {
    check(data.name, String);
    check(data.text, [String, String, String, String]);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
    const generatedId = new Mongo.ObjectID()._str;
    const revisionId = Meteor.call(
      'revisions.insert',
      { name: 'First version',
        text: data.text,
        parent: generatedId,
        description: null }
    );
    Meteor.call('forums.insert', {
      parent: generatedId,
      type: 'skill-dev'
    })
    return Skills.insert({
      _id: generatedId,
      text: data.text,
      revision: revisionId,
      createdAt: new Date(),
      author: Meteor.userId()
    });
  }/*,
  'skills.remove' (taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'skills.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'skills.setPrivate' (taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {
        private: setToPrivate
      }
    });
  }*/
});
