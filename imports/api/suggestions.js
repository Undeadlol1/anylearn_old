import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Suggestions = new Mongo.Collection('suggestions')

if (Meteor.isServer) {
  Meteor.publish('suggestions', function suggestionsPublication(parentId) {
    return Suggestions.find({
      parent: parentId
    }, {
        sort: {
            createdAt: 1
        }
    })
  })
}

Meteor.methods({
  'suggestions.insert' ({name, text, parent}) {
    check(name, String)
    check(text, Match.Maybe(String))
    check(parent, String)
    // Make sure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    const suggestionId = Suggestions.insert({
      name,
      text,
      parent,
      author: Meteor.userId(),
      createdAt: new Date()
    })
    const textOrName = function(){
      if(text) return text
      return name
    }
    Meteor.call('threads.insert', {
      name,
      text: textOrName(),
      parent: suggestionId,
      _id: suggestionId
    })
    return suggestionId
  },
  'getUserId' () {
      const userId = Meteor.userId()
      console.log(userId)
      console.log('getUserId is called!')
      console.log('userId', userId)
      return userId
  }
})
