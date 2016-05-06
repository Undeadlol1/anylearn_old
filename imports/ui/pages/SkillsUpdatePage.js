import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import Wysiwyg from '../components/Wysiwyg'


class SkillsUpdatePage extends Component {
  handleSkillUpdate(e){
    e.preventDefault()
    Meteor.call('users.subscribe', this.props.skillId)
  }
  render() {
    const showSubscribedIcon = ()=> {
      // if user exists, and has skillId in skills array
      const user = this.props.user
      if (
        user &&
        user.profile.skills &&
        user.profile.skills.indexOf(this.props.skillId) != -1
      ) return 'turned_in'
      return 'turned_in_not'

    }
    return (
      <div className="row">
          <div className="col s12">
              <h1 className="center-align">{this.props.skill.name}</h1>
              <form onSubmit={this.handleSkillUpdate()}>
                  <wysiwyg label="Новичок" text={this.props.revision.text[0]}></wysiwyg>
                  <wysiwyg label="Ученик" text={this.props.revision.text[1]}></wysiwyg>
                  <wysiwyg label="Практикант" text={this.props.revision.text[2]}></wysiwyg>
                  <wysiwyg label="Мастер" text={this.props.revision.text[3]}></wysiwyg>
                  <div className="input-field">
                      <input type="text" ng-model="$ctrl.name" required />
                      <label>Название изменения</label>
                  </div>
                  <div className="input-field">
                      <textarea ng-model="$ctrl.description" className="materialize-textarea"></textarea>
                      <label>Описание изменения (желательно)</label>
                  </div>
                  <button className="btn waves-effect waves-light" type="submit" name="action">Сохранить
                      <i className="material-icons right">send</i>
                  </button>
              </form>
          </div>
      </div>
    )
  }
}

SkillsUpdatePage.propTypes = {
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
}, SkillsUpdatePage)
