import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Skills } from '../../api/skills'
import { Revisions } from '../../api/revisions'
import IndexPage from '../pages/IndexPage'

export default createContainer(() => {
    const 	revisionsReady 	= 	Meteor.subscribe('revisions').ready(),
		    usersReady 		= 	Meteor.subscribe('users').ready(),
			skillsReady 	= 	Meteor.subscribe('skills').ready(),
			users 			= 	Meteor.users.find().fetch(),
			skills 			= 	Skills.find().fetch(),
			revisions		= 	Revisions.find().fetch()

	users.forEach(user => {
		user.revisionsCount = 	Revisions.find({
									userId: user._id
								}).count()
    })

	skills.forEach(skill => {
		skill.learningCount = 	Meteor.users.find({
									'profile.learning': skill._id
								}).count()
		skill.curatingCount = 	Meteor.users.find({
									'profile.curating': skill._id
								}).count()
	})

    return {
      users,
      skills,
      revisions,
      numberOfSkills: Counts.get('numberOfSkills'),
      loaded: skillsReady && revisionsReady && usersReady
    }
}, IndexPage)
