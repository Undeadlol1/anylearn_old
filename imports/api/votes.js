import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Votes = new Mongo.Collection('votes')

Votes.schema = new SimpleSchema({
	choice: {
		label: 'vote choice',
		type: Boolean,
		defaultValue() {
			return null
		}
	},
	parent: {
		label: 'vote parent',
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	userId: {
		label: 'vote userId',
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if ( this.isInsert ) return this.userId }
	},
	createdAt: {
		label: 'vote createdAt',
		type: Date,
		autoValue() {
			if ( this.isInsert ) return new Date()
		}
	}
})

Votes.attachSchema(Votes.schema)

Meteor.methods({
    'votes.choose' (data) {
        check(data.choice, Match.Maybe(Boolean))
        check(data.parent, String)
        // Make sure the user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }
        // make sure user did not voted already
        // but question is: do i really need to check it?
        const votes = Votes.find({
            parent: data.parent,
            userId: Meteor.userId()
        }).count()
        if (votes === 0) Meteor.call('votes.insert', (data))
        else Meteor.call('votes.update', (data))
    },
    'votes.insert' (data) {
        check(data.choice, Match.Maybe(Boolean))
        check(data.parent, String)
        // Make sure the user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }
        // make sure user did not voted already
        return Votes.insert({
            choice: data.choice,
            parent: data.parent
        })
    },
    'votes.update' (data) {
        check(data.choice, Match.OneOf(Boolean, null))
        check(data.parent, String)
        // Make sure the user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized')
        }
        return Votes.update({
            parent: data.parent,
            userId: Meteor.userId()
        }, {
            $set: {
                choice: data.choice
            }
        })
    }
})

if (Meteor.isServer) {
    Meteor.publish('votes', function votesPublication(
      selector = {},
      options = {
        sort: {
            createdAt: -1
        }
    }) {
        return Votes.find(selector, options)
    })
}
