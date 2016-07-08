import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Revisions } from './revisions'
import { Threads } from './threads'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Skills = new Mongo.Collection('skills')

if (Meteor.isServer) {
  Meteor.publish('skills', function skillsPublication(
    selector = {},
    options = {
      sort: {
          createdAt: -1
      }
  }) {
      Counts.publish(this, 'numberOfSkills', Skills.find(selector), {
          noReady: true
      })
      return Skills.find(selector, options)
  })
}
const regExId = SimpleSchema.RegEx.Id

Skills.schema = new SimpleSchema({
	name: {type: String},
	slug: {type: String},
	_id: {type: String, regEx: regExId},
	revision: {
		type: String,
		regEx: regExId/*,
		autoValue() {
			Meteor.call('manifests.insert', this.docId)
		}*/
	},
	userId: { // author
		type: String,
		regEx: regExId,
		autoValue() {
			console.log(this.isInsert, this.userId)
			if ( this.isInsert ) return this.userId
		}
	},
	createdAt: {
		type: Date,
		autoValue() {
			if ( this.isInsert ) return Date.now()
		}
	}
})
Skills.attachSchema(Skills.schema)
Skills.friendlySlugs()

Skills.helpers({
	revision() {
		return Revisions.findOne({ parent: this._id, active: true })
	},
	threads() {
		return Threads.find({ parent: this._id, type: "skill" })
	}
})


Meteor.methods({
	'skills.insert' (data) {
    check(data.name, String)
    check(data.text, [String])

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // somehow sometimes you bypass name check
    if (data.name.trim() === "") {
      throw new Meteor.Error('name-is-empty')
    }

    const generatedId = new Mongo.ObjectID()._str
    Meteor.call('forums.insert', generatedId)
    Meteor.call('manifests.insert', generatedId)
    Meteor.call('users.subscribe', generatedId)

    const revisionId = Meteor.call('revisions.insert', {
		name: 'First version',
		description: null,
		text: data.text,
		parent: generatedId,
		previous: null
    })

    Skills.insert({
          _id: generatedId,
          name: data.name,
          revision: revisionId,
          createdAt: new Date(),
          author: Meteor.userId()
    })
    return Skills.findOne(generatedId).slug
	},
	'skills.getId' (selector) {
		return Skills.findOne(selector)._id
	}
})
