import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { SubsManager } from 'meteor/meteorhacks:subs-manager'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Skills } from '../../api/skills'
import { Revisions } from '../../api/revisions'
import IndexPage from '../pages/IndexPage'

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })

export default IndexPageContainer = createContainer(() => {
    const perPage = 10
    //let skip = new ReactiveVar(0)
    const 	revisionsReady 	= 	Meteor.subscribe('revisions', {}).ready(),
		    usersReady 		= 	Meteor.subscribe('users', {}).ready(),
			skillsReady 	= 	Meteor.subscribe('skills',
									      {},
									      {
									        sort: { createdAt: 1 },
									        //limit: perPage,
									        //skip: skip.get()
							    }).ready()

    const users = Meteor.users.find().fetch()
	users.forEach(user => {
		user.revisionsCount = 	Revisions.find({
									author: user._id
								}).count()
    })

	const skills = Skills.find().fetch()
	skills.forEach(skill => {
			skill.learningCount = Meteor.users.find({
				'profile.learning': skill._id
			}).count()
			skill.curatingCount = Meteor.users.find({
				'profile.curating': skill._id
			}).count()
	})

    return {
      users,
      skills,
      revisions: Revisions.find().fetch(),
      numberOfSkills: Counts.get('numberOfSkills'),
      loaded: skillsReady && revisionsReady && usersReady
    }
}, IndexPage)
