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
    check(data.text, [String]);

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
        description: undefined }
    );
    Meteor.call('forums.insert', {
      parent: generatedId
    })
    return Skills.insert({
      _id: generatedId,
      name: data.name,
      revision: revisionId,
      createdAt: new Date(),
      author: Meteor.userId()
    });
  }
});
