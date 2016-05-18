import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import Wysiwyg from './Wysiwyg'

export default class SkillsUpdate extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: [' ', ' ', ' ', ' '],
      name: '',
      desription: ''
    }
  }
  _handleTextChange(position, text){
    let array = this.state.text
    // set changed text to right position in array
    array[position] = text
    // prevent array values from being undefined
    // i have no idea why i am using this constructs, i feel stupid today
    let newArray = [' ', ' ', ' ', ' ']
    array.forEach((item, index)=>{
      if(item == '' || item == ' ' || !item) newArray[index] = this.props.revision.text[index]
      else newArray[index] = item
    })
    this.setState({ text: newArray })
  }
  _handleChange(item, event){
    this.setState({[item]: event.target.value})
  }
  _handleSkillsUpdate(e){
    e.preventDefault()
    // get values for method call
    const {description, name, text} = this.state
    const {parent} = this.props.revision
    const previous = this.props.revision._id
    const data = {text, name, description, parent, previous}
    // try sending data
    try {
      if (text == this.props.text) throw new Error("You didn't changed anything!")
      Meteor.call('revisions.update', data,
        (err) => {
            if (err) console.error(err)
            else {
              FlowRouter.go(`/skill/${parent}`)
            }
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    const {text} = this.props.revision
    return (
      <div className="row">
          <div className="col s12">
              <h1 className="center-align">{this.props.skillName}</h1>
              <form onSubmit={this._handleSkillsUpdate.bind(this)}>
                  <Wysiwyg label="Новичок" text={text[0]} onChange={this._handleTextChange.bind(this, 0)} />
                  <Wysiwyg label="Ученик" text={text[1]} onChange={this._handleTextChange.bind(this, 1)} />
                  <Wysiwyg label="Практикант" text={text[2]} onChange={this._handleTextChange.bind(this, 2)} />
                  <Wysiwyg label="Мастер" text={text[3]} onChange={this._handleTextChange.bind(this, 3)} />
                  <div className="row">
                    <div className="input-field col s12">
                        <input onChange={this._handleChange.bind(this, 'name')} type="text" required />
                        <label>Название изменения</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                        <textarea onChange={this._handleChange.bind(this, 'description')} className="materialize-textarea"></textarea>
                        <label>Описание изменения (желательно)</label>
                    </div>
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

SkillsUpdate.propTypes = {
 skillName: PropTypes.string.isRequired,
 revision: PropTypes.object.isRequired
}
