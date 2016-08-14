import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { ReactiveVar } from 'meteor/reactive-var'
import { SubsManager } from 'meteor/meteorhacks:subs-manager'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import { Responses } from '../../api/responses.js'
import SkillPage from '../pages/SkillPage'
import get from 'oget'

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })
const perPage = 10
let skipThreads = new ReactiveVar(0)
let skipRevisions = new ReactiveVar(0)

export default createContainer(() => {

	const 	slug = FlowRouter.getParam('skillSlug'),
			skillsReady = Meteor.subscribe('skills').ready(),
			skill = Skills.findOne({slug}),
			skillId = get(skill, '_id'),//
			revisionsReady 	= 	Meteor.subscribe('revisions', {
									// not specifying parent is better for perfomance?
									// it's removes flash on changing SkillPage?
									//parent: skillId,
									active: true
								}).ready(),
			threadsReady 	= 	Meteor.subscribe(
									'threads',
									{
										parent: skillId,
										type: "skill"
									},
									{
										sort: { createdAt: -1 },
										limit: perPage,
										skip: skipThreads.get()
									}
								).ready(),
			responseReady 	= 	Meteor.subscribe('responses', {
									parent: skillId,
									userId: Meteor.userId()
								}).ready()

	try {
		// console.log(skill && skill.revision())
		// console.log(skill && skill.threads())
		// console.log(skill && skill.response())
	} catch (err) {
		console.warn(err)
	}

	return {
		skillId,
		skill,
		//revision: skill && skill.revision(), //Revisions.findOne({parent: skillId}) || {}
		//response: skill && skill.response(),
		//threads: skill && skill.threads(),
		revision: 	Revisions.findOne({
						parent: skillId,
						active: true
					}) || {},
		threads: 	Threads.find({
						parent: skillId,
						type: "skill"
					}).fetch(),
		response: 	Responses.findOne({
						parent: skillId,
						userId: Meteor.userId()
					}) || {},
		numberOfThreads: Counts.get('numberOfThreads'),
		loaded: skillsReady && revisionsReady && threadsReady
	}

}, SkillPage)
