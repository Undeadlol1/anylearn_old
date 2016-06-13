import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Revisions } from '../../api/revisions.js'
import { Skills } from '../../api/skills.js'
import SkillsUpdate from '../components/SkillsUpdate'

class SkillsUpdatePage extends Component {
  render() {
    return <SkillsUpdate skillName={this.props.skillName} revision={this.props.revision} />
  }
}

SkillsUpdatePage.propTypes = {
 skillName: PropTypes.string.isRequired,
 revision: PropTypes.object.isRequired
}

export default createContainer(() => {
  const skillsReady = Meteor.subscribe('skills', {slug: FlowRouter.getParam('slugId')}).ready()
  const skill = Skills.findOne()
  const parent = skill ? skill._id : ''  // FlowRouter.getParam('slugId
  const revisionsReady = Meteor.subscribe('revisions', {
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
