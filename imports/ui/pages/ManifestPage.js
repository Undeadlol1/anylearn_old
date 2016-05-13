import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import List from '../components/List'


class ManifestPage extends Component {
  handleSubmit(e){
    e.preventDefault()
    Meteor.call('users.subscribe', this.props.skillId)
  }
  render() {
    return (
      <section>
        <div className="row">
            <div className="col s12">
              <form name="form" onSubmit={this.handleSubmit}>
                <div className="row">
                 <div className="input-field col s12">
                  <input ref="name" type="text" required />
                  <label>Название</label>
                 </div>
               </div>
               <div className="row">
                  <div className="input-field col s12">
                    <textarea ref="text" className="materialize-textarea"></textarea>
                    <label>Описание</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button className="btn waves-effect waves-light" type="submit">Сохранить
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </div>
        <suggestions name="Основные положения" parent={this.props.manifestId}></suggestions>
      </section>
    )
  }
}

ManifestPage.propTypes = {
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
}, ManifestPage)
