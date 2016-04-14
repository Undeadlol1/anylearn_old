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
  'suggestions.insert' (data) {
    check(data.name, String)
    check(data.text, Match.Maybe(String))
    check(data.parent, String)
    // Make sure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    const suggestionId = Suggestions.insert({
      name: data.name,
      text: data.text,
      parent: data.parent,
      author: Meteor.userId(),
      createdAt: new Date()
    })
    const textOrName = function(){
      if(data.text) return data.text
      return data.name
    }
    Meteor.call('threads.insert', {
      name : data.name,
      text: textOrName(),
      parent: suggestionId,
      _id: suggestionId
    })
    return suggestionId
  }
})
