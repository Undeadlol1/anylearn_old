import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import SkillStages from '../components/SkillStages'
import ThreadsInsert from '../components/ThreadsInsert'
import List from '../components/List'


class SkillPage extends Component {
  subscribe(e){
    e.preventDefault()
    Meteor.call('users.subscribe', this.props.skillId)
  }
  render() {
    const showSubscribedIcon = ()=> {
      // if user exists, and has skillId in skills array
      const user = this.props.user
      if (user &&
          user.profile.skills &&
          user.profile.skills.indexOf(this.props.skillId) != -1
      ) return 'turned_in'
      return 'turned_in_not'

    }
    return (
      <div>
        <div className="row section">
            <div className="col s12">
                <div style={{overflow: 'auto', paddingTop: 20 + 'px'}}>
                  <a href={`skill/${this.props.skill._id}/edit`} className="btn waves-effect waves-light left">Улучшить
                    <i className="material-icons right">mode_edit</i>
                  </a>
                  <a href={`skill/${this.props.skill._id}/forum`} className="btn waves-effect waves-light right">Обсуждение
                    <i className="material-icons right">list</i>
                  </a>
                  <a className="waves-effect waves-blue btn-flat right" title="подписаться" onClick={this.subscribe.bind(this)}>
                    <i className="material-icons center-align">{showSubscribedIcon()}</i>
                  </a>
                </div>
                <h1 className="center-align">{this.props.skill.name}</h1>
            </div>
        </div>
        <SkillStages text={this.props.revision.text} />
        <div className="divider"></div>
        <ThreadsInsert parent={this.props.skillId} type="skill" />
        <List name="Обсуждения" items={this.props.threads} href="thread"/>
        {/*<Threads-list parent={this.props.skill._id} type="skill" /> */}
      </div>
    )
  }
}

SkillPage.propTypes = {
 skill: PropTypes.object.isRequired,
 revision: PropTypes.object.isRequired,
 threads: PropTypes.array.isRequired,
 user: PropTypes.object
}

export default createContainer(() => {
  const skillId = FlowRouter.getParam('skillId')
  Meteor.subscribe('skills', skillId)
  Meteor.subscribe('revisions', {
    parent: skillId,
    active: true
  })
  Meteor.subscribe('threads', {
      parent: skillId,
      type: "skill"
  }/*, {
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
  }*/)
  const skill = Skills.findOne()
  const revision = Revisions.findOne()
  return {
      skill: skill ? skill : {},
      revision: revision ? revision : {},
      threads: Threads.find({}).fetch(),
      user: Meteor.user(),
      skillId
  }
}, SkillPage)
