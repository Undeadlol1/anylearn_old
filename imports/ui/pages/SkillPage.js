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
import Loading from '../components/Loading'


class SkillPage extends Component {
  constructor(props){
    super(props)
    this.state = {subscribed: false}
  }
  subscribe(e){
    e.preventDefault()
    Meteor.call('users.subscribe', this.props.skillId,
    (err, succes)=>{
        if (err) console.log(err)
        else this.setState({subscribed: true})
    })
  }
  render() {
    const showSubscribedIcon = ()=> {
      try {
        const skills = Meteor.user().profile.skills
        return (skills.indexOf(this.props.skillId) != -1)
      } catch (e) {
        return false
      }
    }
    return this.props.loaded ? (
      <div>
        <div className="row section">
            <div className="col s12">
                <div style={{overflow: 'auto', paddingTop:  '20px'}}>
                  <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
                    <a href={`/skill/${this.props.skill._id}/edit`} className="btn-floating btn-large waves-effect waves-light">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  </div>
                  <a href={`/skill/${this.props.skill._id}/dev`} className="btn waves-effect waves-light right">Обсуждение
                    <i className="material-icons right">list</i>
                  </a>
                  <a className="waves-effect waves-blue btn-flat left" title="подписаться" onClick={this.subscribe.bind(this)}>
                    <i className="material-icons center-align">{showSubscribedIcon() ? 'turned_in' : 'turned_in_not'}</i>
                  </a>
                </div>
                <h1 className="center-align">{this.props.skill.name}</h1>
            </div>
        </div>
        <SkillStages text={this.props.revision.text} />
        <ThreadsInsert parent={this.props.skillId} type="skill" />
        <List name="Обсуждения" items={this.props.threads} href="thread"/>
      </div>
    ) : <Loading />
  }
}

SkillPage.propTypes = {
 skill: PropTypes.object.isRequired,
 revision: PropTypes.object.isRequired,
 threads: PropTypes.array.isRequired,
// user: PropTypes.object
}

export default createContainer(() => {
  const skillId = FlowRouter.getParam('skillId')
  const skillsReady = Meteor.subscribe('skills', skillId).ready()
  const revisionsReady = Meteor.subscribe('revisions', {
    parent: skillId,
    active: true
  }).ready()
  const threadsReady = Meteor.subscribe('threads', {
      parent: skillId,
      type: "skill"
  }/*, {
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
  }*/).ready()
  const skill = Skills.findOne()
  const revision = Revisions.findOne()
  const threads = Threads.find({}).fetch()
  return {
      skill: skill ? skill : {},
      revision: revision ? revision : {},
      threads: threads,
      loaded: skillsReady && revisionsReady && threadsReady,
      skillId
  }
}, SkillPage)
