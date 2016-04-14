import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Notifications = new Mongo.Collection('notifications')

if (Meteor.isServer) {
  Meteor.publish('notifications', function notificationsPublication() {
    return Notifications.find({
      userId: this.userId,
      active: true
    }, {
        sort: {
            createdAt: -1
        }
    })
  })
}

Meteor.methods({
  'notifications.insert' (data) {
    check(data.name, String)
    check(data.targetId, String)
    check(data.parent, String)
    check(data.type, String)
    check(data.author, String)

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }

  return Meteor.users.find({
      'profile.skills' : data.parent
    }).forEach(user=>{
      if (user._id !== data.author){
      Notifications.insert({
          name: data.name,
          targetId: data.targetId,
          parent: data.parent,
          type: data.type,
          active: true,
          createdAt: new Date(),
          userId: user._id
        })
      }
    })
  },
  'notifications.update' (_id) {
    check(_id, String)
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Notifications.update(_id, {$set:
      { active: false }
    })
  }
})
