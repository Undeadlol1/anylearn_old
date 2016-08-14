import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'
import { check } from 'meteor/check'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Revisions } from './revisions'
import { Responses } from './responses'
import { Threads } from './threads'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import slugify from 'slug'
import { schemaMixin } from './mixins'

export const Skills = new Mongo.Collection('skills')

Skills.schema = new SimpleSchema({
	name: {
		type: String,
		label: 'skill name',
		index: true,
		unique: true
	},
	slug: {
		type: String,
		label: 'skill slug',
		index: true,
		unique: true
	},
	revisionId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		label: 'skill revisionId'
	},
	userId: {
		type: String,
		label: 'skill userId',
		regEx: SimpleSchema.RegEx.Id,
		autoValue() { if ( this.isInsert ) return this.userId }
	},
	createdAt: {
		label: 'skill createdAt',
		type: Date,
		autoValue() { if ( this.isInsert ) return new Date() }
	}
})
Skills.attachSchema(Skills.schema)


/*SimpleSchema.extendOptions({
  denyInsert: Match.Optional(Boolean),
  denyUpdate: Match.Optional(Boolean)
});*/
// TODO test if helpers work properly with collection-hooks disabled
Skills.helpers({
	revision() {
		return Revisions.findOne({
			parent: this._id,
			active: true
		}) || {}
	},
	threads() {
		return Threads.find({
			parent: this._id,
			type: "skill"
		}).fetch()
	},
	response() {
		console.warn('userId is', Meteor.userId())
		return Responses.findOne({
			parent: this._id,
			userId: Meteor.userId()
		}) || {}
	}
})

Skills.after.insert((userId, doc) => {
	console.warn('after insert happaned!')
	if (doc) { // if insert done properly
		console.warn('Doc exists! Making Meteor calls...')
		// TODO add notifications
		Meteor.call('forums.insert', doc._id)
		Meteor.call('manifests.insert', doc._id)
		Meteor.call('users.toggleLearning', doc._id)
		Meteor.call('users.toggleCurating', doc._id)
	}
})

export const skillsInsert = new ValidatedMethod({
	name: 'skills.insert', //skills.insert
//	validate: Skills.schema, //.validator()
	mixins: [LoggedInMixin], // , schemaMixin //, simpleSchemaMixin
	checkLoggedInError: {
		error: 'notLogged',
		message: 'You need to login'
	},
	validate: new 	SimpleSchema({
						name: { type: String },
						text: { type: [String] },
						image: { type: String }
					}).validator(), //.validator()
	// validate: Skills.schema.validator(), //.validator()
	// schema: Skills.schema.pick(['name', 'text', 'image']),
	run({name, text, image}) {
		const 	skillId = Random.id(),
				slug = slugify(name),
				revisionId =  Meteor.call(
								'revisions.insert', {
									text,
									image,
									parent: skillId
							})
		// insert skill
		Skills.insert({
						name,
						slug,
						revisionId,
						_id: skillId
					})
		console.log(slug)
	    return slug
	}
})

if (Meteor.isServer) {
	Meteor.publish('skills', function skillsPublication(
		selector = {},
		options = { sort: { createdAt: -1 } })
		{
			Counts.publish(this, 'numberOfSkills', Skills.find(selector), {
				noReady: true
			})
			return Skills.find(selector, options)
	})
}
