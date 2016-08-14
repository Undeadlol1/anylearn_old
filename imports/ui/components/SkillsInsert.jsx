import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import Wysiwyg from './Wysiwyg'
import { skill } from '../templates'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { skillsInsert } from '../../api/skills'

export default class SkillsInsert extends Component {

	state = {
      name: '',
      text: skill,
	  image: ''
    }

  _handleNameChange(e){
    this.setState({name: e.target.value})
  }
  _handleImageChange(e){
	this.setState({image: e.target.value})
  }
  _handleTextChange(position, text){
    const array = this.state.text
    array[position] = text
    this.setState({ text: array })
  }
  _handleSkillsInsert(e){
		e.preventDefault()
	    skillsInsert.call(
		  this.state,
	      (err, result) => {
			  if (err) {
				  Materialize.toast(`Произошла ошибка! ${err.reason}`, 4000)
				  console.error(err);
			  }
	          else {
	            FlowRouter.go(`/s/${result}`);
	          }
	      }
	    )
  }

  render() {
    return (
        <form className="card-panel section" onSubmit={this._handleSkillsInsert.bind(this)} {...this.props}>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this._handleNameChange.bind(this)} type="text" required id="skillName" />
                <label htmlFor="skillName">Название навыка</label>
              </div>
            </div>
			<div className="row">
			  <div className="input-field col s12">
				<input onChange={this._handleImageChange.bind(this)} type="url" id="skillImage" />
				<label htmlFor="skillImage">Логотип навыка (не обязательно)</label>
			  </div>
			</div>
            <Wysiwyg label="Новичок" text={this.state.text[0]} onChange={this._handleTextChange.bind(this, 0)} />
            <Wysiwyg label="Ученик" text={this.state.text[1]} onChange={this._handleTextChange.bind(this, 1)} />
            <Wysiwyg label="Практикант" text={this.state.text[2]} onChange={this._handleTextChange.bind(this, 2)} />
            <Wysiwyg label="Мастер" text={this.state.text[3]} onChange={this._handleTextChange.bind(this, 3)} />
            <div className="row">
              <div className="input-field col s12 center">
                <button className="btn waves-effect waves-light" type="submit" name="action">Сохранить
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
        </form>
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
