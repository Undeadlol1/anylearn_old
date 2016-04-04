import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

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
    check(data.text, [String]);
    check(data.parent, String);
    check(data.description, Match.Maybe(String));

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Revisions.insert({
      name: data.name,
      text: data.text,
      description: data.description,
      parent: data.parent,
      active: true,
      createdAt: new Date(),
      author: Meteor.userId()
    });
  },
  'revisions.update' (data) {
    check(data.name, String);
    check(data.text, [String]);
    check(data.parent, String);
    check(data.previous, String);
    check(data.description, Match.Maybe(String));

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Revisions.update(data.previous, {
      $set: {
        active: false
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
  }
});
