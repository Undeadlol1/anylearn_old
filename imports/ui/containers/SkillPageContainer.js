import React, { Component, PropTypes } from 'react'
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

export default SkillPageContainer = createContainer(() => {

	const 	slug = FlowRouter.getParam('skillSlug'),
			skillsReady = Meteor.subscribe('skills').ready(),
			skillId = get(Skills.findOne({slug}), '_id'),
			revisionsReady = Meteor.subscribe('revisions', {
				active: true
			}).ready(),
			threadsReady = Meteor.subscribe(
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
			responseReady = Meteor.subscribe('responses',
				{parent: skillId, userId: Meteor.userId()}
			).ready()
	const skill = Skills.findOne(skillId)
	console.log(skill)
	console.log(skill.revision());
	console.log(skill.threads())
	return {
		skillId,
		skill: Skills.findOne(skillId) || {},
		revision: Revisions.findOne({parent: skillId}) || {},
		response: Responses.findOne() || {},
		threads: Threads.find().fetch(),
		numberOfThreads: Counts.get('numberOfThreads'),
		loaded: skillsReady && revisionsReady && threadsReady
	}

}, SkillPage)
