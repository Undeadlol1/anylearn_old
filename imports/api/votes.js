import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Votes = new Mongo.Collection('votes')

if (Meteor.isServer) {
    Meteor.publish('votes', function votesPublication(parentId) {
        /*return Votes.find({
            parent: parentId
        })*/
        return Votes.find()
    })
}

Meteor.methods({
    'votes.choose' (data) {
        check(data.value, Match.Maybe(Boolean))
        check(data.parent, String)
        // Make sure the user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }
        // make sure user did not voted already
        // but question is: do i really need to check it?
        const votes = Votes.find({
            parent: data.parent,
            author: Meteor.userId()
        }).count()
        if (votes === 0) Meteor.call('votes.insert', (data))
        else Meteor.call('votes.update', (data))
    },
    'votes.insert' (data) {
        check(data.value, Match.Maybe(Boolean))
        check(data.parent, String)
        // Make sure the user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }
        // make sure user did not voted already
        return Votes.insert({
            value: data.value,
            parent: data.parent,
            createdAt: new Date(),
            author: Meteor.userId()
        })
    },
    'votes.update' (data) {
        check(data.value, Match.OneOf(Boolean, null))
        check(data.parent, String)
        // Make sure the user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }
        return Votes.update({
            parent: data.parent,
            author: Meteor.userId()
        }, {
            $set: {
                value: data.value
            }
        })
    }
})
