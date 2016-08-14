import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _ } from 'meteor/underscore'
import { check, Match } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Revisions = new Mongo.Collection('revisions')

Revisions.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'revision name',
		defaultValue: 'Initial version' // move this to skills insert or revision insert?
	},
	text: {
		type: [String],
		label: 'revision text',
		custom() {
			this.value = this.value.filter(item => {
				return !!item && typeof(item) == 'string'
			})
			return this.value ? true : 'expectedString'
		}
	},
	description: {
		type: String,
		label: 'revision description',
		optional: true
	},
	image: {
		type: String,
		label: 'revision image url',
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	active: {
		type: Boolean,
		label: 'revision active state',
		autoValue() { if (this.isInsert) return true }
	},
	parent: {
		type: String,
		label: 'revision parent id' //,
		// TODO write migration for this
		//regEx: SimpleSchema.RegEx.Id
	},
	previous: {
		type: String,
		label: 'revision previous id',
		regEx: SimpleSchema.RegEx.Id,
		optional: true // ?????
	},
	userId: {
		type: String,
		label: 'revision userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if ( this.isInsert ) return this.userId }
	},
	createdAt: {
		label: 'revision createdAt',
		type: Date,
		autoValue() {
			if ( this.isInsert ) return new Date()
		}
	}
})

Revisions.attachSchema(Revisions.schema)

Revisions.after.insert((userId, doc) => {
	if (doc) {
		Revisions.update(// deactivate current active revision
			{
				_id: { $ne: doc._id }, // $eq
				parent: doc.parent,
				active: true
			},
			{ $set: { active: false } }
		)
		// insert positive vote for your revision
		Meteor.call('votes.insert', {choice: true, parent: doc._id})
		// create notification
		Meteor.call('notifications.insert', {
		  name: doc.name,
		  targetId: doc._id,
		  parent: doc.parent,
		  type: 'revision',
		  author: Meteor.userId()
		})
	}
})

Meteor.methods({
	// TODO change isert & update to upsert?
	'revisions.insert' (data) {
		if (!Meteor.userId()) throw new Meteor.Error('not-authorized')
		return Revisions.insert(data)
	},
  'revisions.update' (data) {
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // deactivate current revision
    /*Revisions.update(data.previous, {
      $set: {
        active: false
      }
    })*/
	// name: data.name,//
	// text: data.text,
	// description: data.description,
	// image: data.image,
	// parent: data.parent,
	// previous: data.previous
    // insert new active revision
	console.log(data)

    return Revisions.insert(data)
  },
  'revisions.revert' (_id, reason) {
    check(_id, String)
    check(reason, String)

	// check if user is logged in
	//isLoggedIn // remove this?
    // make sure user is admin
	//isAdmin

    // deactivate current revision
    Revisions.update(_id, {
      $set: {
        active: false,
        reverted: true
      }
    })
	// THIS MUST BE REWORKED. ON REVERT IMAGE DOES NOT COME BACK
    // insert new active revision
    const current = Revisions.findOne(_id)
    const previous = Revisions.findOne({previous: current.previous})
    const newRevisionId = Revisions.insert({
      name: `Отменяет "${current.name}"`,
      description: reason,
      text: previous.text,
      parent: previous.parent,
      previous: previous.previous,
      author: ''
    })

    // create notification
    Meteor.call('notifications.insert', {
      name: `Отменяет "${current.name}"`,
      targetId: newRevisionId,
      parent: previous.parent,
      type: 'revision',
      author: Meteor.userId()
    })
    return newRevisionId
	}
})

if (Meteor.isServer) {
  Meteor.publish('revisions', function revisionsPublication (
	  selector = {}, options = { sort: { createdAt: -1 } }
  ) {
      Counts.publish(this, 'numberOfRevisions', Revisions.find(selector), {
          noReady: true
      })
      return Revisions.find(selector, options)
  })
}
