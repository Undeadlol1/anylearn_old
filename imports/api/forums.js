import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Forums = new Mongo.Collection('forums')
if (Meteor.isServer) {
  Meteor.publish('forums', function forumsPublication() {
    return Forums.find()
  })
}
Meteor.methods({
  'forums.insert' (skillId, name) {
    check(skillId, String)
    check(name, Match.Maybe(String))
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    if (name){
      return Forums.insert({
        name,
        parent: skillId,
        createdAt: new Date()
      })
    }
    else {
      return Forums.insert({
        parent: skillId,
        createdAt: new Date()
      })
    }
  }
})
