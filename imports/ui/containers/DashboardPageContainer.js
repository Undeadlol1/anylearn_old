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
import DashboardPage from '../pages/DashboardPage'
import get from 'oget'

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })
const perPage = 10
let skipThreads = new ReactiveVar(0)
let skipRevisions = new ReactiveVar(0)

export default DashboardPageContainer = createContainer(() => {

	const 	user = Meteor.user(),
			skillsReady = Meteor.subscribe('skills').ready()

	return {
		skills: Skills.find(
			{
				"_id": {
					$in: get(user, 'profile.learning')
				}
			}
		).fetch(),
		loaded: skillsReady
	}
	
}, DashboardPage)
