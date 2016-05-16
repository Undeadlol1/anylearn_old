import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import Wysiwyg from './Wysiwyg'
import { skill } from '../templates'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class SkillsInsert extends Component {
  handleSkillsInsert(e){
    e.preventDefault()
    // get values for method call
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim()
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim()
    Meteor.call('skills.insert', { name, text },
      (err, _id) => {
          if (err) console.log(err)
          else {
            FlowRouter.go(`/skill/${_id}`);
          }
      }
    )
  }

  render() {
    return (
      <div className="row">
          <div className="col s12">
              <form onSubmit={this.handleSkillsInsert.bind(this)}>
                <div className="input-field">
                  <input ref="name" type="text" required />
                  <label>Название навыка</label>
                </div>
                <Wysiwyg label="Новичок" text={skill[0]} container="editable" />
                <Wysiwyg label="Ученик" text={skill[1]} container="editable" />
                <Wysiwyg label="Практикант" text={skill[2]} container="editable" />
                <Wysiwyg label="Мастер" text={skill[3]} container="editable" />
                <button className="btn waves-effect waves-light" type="submit" name="action">Сохранить
                  <i className="material-icons right">send</i>
                </button>
              </form>
          </div>
      </div>
    )
  }
}
/*SkillsInsert.defaultProps = {
  label: '',
  text: ''
}*/
/*SkillsInsert.propTypes = {
  parent: PropTypes.string.isRequired
  //type: PropTypes.string.isRequired
}*/
