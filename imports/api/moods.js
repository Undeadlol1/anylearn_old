import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import slugify from 'slug'

export const Moods = new Mongo.Collection('moods')

Moods.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'mood name',
		index: true,
		unique: true
	},
	slug: {
		type: String,
		label: 'mood slug',
		index: true,
		unique: true
	},
	userId: {
		type: String,
		label: 'mood userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if (this.isInsert) return this.userId }
	},
	createdAt: {
		label: 'mood createdAt',
		type: Date,
		autoValue() { if (this.isInsert) return new Date() }
	}
})
Moods.attachSchema(Moods.schema)

export const moodsInsert = new ValidatedMethod({
	name: 'moods.insert',
	mixins: [LoggedInMixin],
	checkLoggedInError: {
		error: 'notLogged',
		message: 'You need to login'
	},
	validate: new 	SimpleSchema({
						name: { type: String }
					}).validator(),
	run({name}) {
		const slug = slugify(name)
	    Moods.insert({ name, slug })
		return slug
	}
})

if (Meteor.isServer) {
  Meteor.publish('moods', function moodsPublication(
    selector = {},
    options = {
      sort: {
          createdAt: -1
      }
  }) {
      Counts.publish(this, 'numberOfMoods', Moods.find(selector), {
          noReady: true
      })
      return Moods.find(selector, options)
  })
}
