import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { ReactiveVar } from 'meteor/reactive-var'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import { Responses } from '../../api/responses.js'
import SkillStages from '../components/SkillStages'
import ThreadsInsert from '../components/ThreadsInsert'
import Interview from '../components/Interview'
import List from '../components/List'
import Loading from '../components/Loading'

const perPage = 10
let skipThreads = new ReactiveVar(0)
let skipRevisions = new ReactiveVar(0)

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
  changePage(e) {
    skipThreads.set(e.selected * perPage)
  }
  render() {
    const p = this.props
    const showSubscribedIcon = ()=> {
      try {
        const {skills} = Meteor.user().profile
        return (skills.indexOf(p.skillId) != -1)
      } catch (e) {
        return false
      }
    }

    return p.loaded ? (
      <div>
        <div className="row section">
            <div className="col s12">
                <div style={{overflow: 'auto', paddingTop:  '20px'}}>
                  <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
                    <a href={`/s/${p.skill.slug}/edit`} className="btn-floating btn-large waves-effect waves-light">
                      <i className="large material-icons">mode_edit</i>
                    </a>
                  </div>
                  <a href={`/s/${p.skill.slug}/dev`} className="btn waves-effect waves-light right">Обсуждение
                    <i className="material-icons right">list</i>
                  </a>
                  <a className="waves-effect waves-blue btn-flat left" title="подписаться" onClick={this.subscribe.bind(this)}>
                    <i className="material-icons center-align">{showSubscribedIcon() ? 'turned_in' : 'turned_in_not'}</i>
                  </a>
                </div>
                <h1 className="center-align">{p.skill.name}</h1>
            </div>
        </div>
        <SkillStages text={p.revision.text} />
        <Interview parent={p.skillId} response={p.response} />
        <ThreadsInsert parent={p.skillId} type="skill" />
        <List
          name="Обсуждения"
          items={p.threads}
          href="thread"
          numberOfItems={p.numberOfThreads}
          onChangePage={this.changePage.bind(this)} />
      </div>
    ) : <Loading />
  }
}

SkillPage.propTypes = {
 skill: PropTypes.object.isRequired,
 revision: PropTypes.object.isRequired,
 threads: PropTypes.array.isRequired
}

export default createContainer(() => {
  const skillsReady = Meteor.subscribe('skills', {
    slug: FlowRouter.getParam('skillSlug')
  }).ready(),
  skillId = Skills.findOne() ? Skills.findOne()._id : '',
  /*try {
    let skillId = Skills.findOne()._id
  } catch (e) {
    let skillId = ''
  }*/
  revisionsReady = Meteor.subscribe('revisions', {
    parent: skillId,
    active: true
  }).ready(),
  threadsReady = Meteor.subscribe('threads', {
      parent: skillId,
      type: "skill"
    }, {
      sort: { createdAt: -1 },
      limit: perPage,
      skip: skipThreads.get()
  }),
  responseReady = Meteor.subscribe('responses', {
    parent: skillId, userId: Meteor.userId()
  }).ready()

  let skill = Skills.findOne()
  let revision = Revisions.findOne()
  let response = Responses.findOne()
  let threads = Threads.find().fetch()
  return {
      skill: skill ? skill : {},
      revision: revision ? revision : {},
      response: response ? response : {},
      threads: threads,
      numberOfThreads: Counts.get('numberOfThreads'),
      loaded: skillsReady && revisionsReady,// && threadsReady,
      skillId
  }
}, SkillPage)
