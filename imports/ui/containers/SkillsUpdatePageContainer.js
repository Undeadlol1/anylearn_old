import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { SubsManager } from 'meteor/meteorhacks:subs-manager'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import SkillsUpdatePage from '../pages/SkillsUpdatePage'

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })

export default SkillsUpdatePageContainer = createContainer(() => {
    const skillsReady = subsManager.subscribe('skills', {slug: FlowRouter.getParam('slugId')}).ready()
    const skill = Skills.findOne()
    const parent = skill ? skill._id : ''
    const revisionsReady = subsManager.subscribe('revisions', {
      parent,
      active: true
    }).ready()
    const revision = Revisions.findOne()
    return {
        skillName: skill ? skill.name : '',
        revision: revision ? revision : {
          text: ['', '', '', ''],
          previous: '',
          parent
        },
        loaded: skillsReady && revisionsReady
    }
}, SkillsUpdatePage)
