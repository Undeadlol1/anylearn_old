import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import Wysiwyg from './Wysiwyg'
import { skill } from '../templates'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class SkillsInsert extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      text: skill
    }
  }
  _handleNameChange(e){
    this.setState({name: e.target.value})
  }
  _handleTextChange(position, text){
    const array = this.state.text
    array[position] = text
    this.setState({ text: array })
  }
  _handleSkillsInsert(e){
    e.preventDefault()
    // get values for method call
    const name = this.state.name
    const text = this.state.text
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
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this._handleNameChange.bind(this)} type="text" required />
                <label>Название навыка</label>
              </div>
            </div>
              <form onSubmit={this._handleSkillsInsert.bind(this)}>
                <Wysiwyg label="Новичок" text={this.state.text[0]} onChange={this._handleTextChange.bind(this, 0)} />
                <Wysiwyg label="Ученик" text={this.state.text[1]} onChange={this._handleTextChange.bind(this, 1)} />
                <Wysiwyg label="Практикант" text={this.state.text[2]} onChange={this._handleTextChange.bind(this, 2)} />
                <Wysiwyg label="Мастер" text={this.state.text[3]} onChange={this._handleTextChange.bind(this, 3)} />
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
