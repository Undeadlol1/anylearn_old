import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Posts = new Mongo.Collection('posts')

if (Meteor.isServer) {
  Meteor.publish('posts', function postsPublication() {
    return Posts.find()
  })
}

Meteor.methods({
  'posts.insert' (name, text) {
    check(name, String)
    check(text, String)
    const author = Meteor.user()
    if (!author) {
      throw new Meteor.Error('not-authorized')
    }
    else if(!author.roles['admin']){
      throw new Meteor.Error('not-admin')
    }
    return Posts.insert({
      name,
      text,
      author,
      createdAt: new Date()
    })
  }
})
