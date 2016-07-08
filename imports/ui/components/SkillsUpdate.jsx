import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import {$} from 'meteor/jquery'
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
  componentDidMount(){
    $(this.refs.tabs).tabs()
  }
  componentWillUnmount() {
      $(this.refs.tabs).remove()
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
            if (err) Materialize.toast(`Произошла ошибка! ${err.name}`, 4000)
            else {
                Materialize.toast('Сохранено!', 4000)
                if (this.props.callback) this.props.callback()
                else FlowRouter.go(`/s/${FlowRouter.getParam('skillSlug')}`)
            }
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    const {text} = this.props.revision
    const {_handleChange, _handleTextChange, _handleSkillsUpdate} = this
    return (
      <div className="row card-panel" {...this.props}>
          <div className="col s12">
              <ul className="tabs" ref="tabs">
                  <li className="tab col s3">
                      <a href="#stage1">Новичок</a>
                  </li>
                  <li className="tab col s3">
                      <a href="#stage2">Ученик</a>
                  </li>
                  <li className="tab col s3">
                      <a href="#stage3">Практикант</a>
                  </li>
                  <li className="tab col s3">
                      <a href="#stage4">Мастер</a>
                  </li>
              </ul>
          </div>
          <div className="col s12">
              <form onSubmit={_handleSkillsUpdate.bind(this)}>
                  <Wysiwyg id="stage1" text={text[0]} onChange={_handleTextChange.bind(this, 0)} />
                  <Wysiwyg id="stage2" text={text[1]} onChange={_handleTextChange.bind(this, 1)} />
                  <Wysiwyg id="stage3" text={text[2]} onChange={_handleTextChange.bind(this, 2)} />
                  <Wysiwyg id="stage4" text={text[3]} onChange={_handleTextChange.bind(this, 3)} />
                  <div className="row">
                    <div className="input-field col s12">
                        <input onChange={_handleChange.bind(this, 'name')} type="text" required />
                        <label>Название изменения</label>
                    </div>
                  </div>
                  <div className="row center">
                    <div className="input-field col s12">
                        <textarea onChange={_handleChange.bind(this, 'description')} className="materialize-textarea"></textarea>
                        <label>Описание изменения (желательно)</label>
                    </div>
                  </div>
                  <div className="row center">
                      <button className="btn waves-effect waves-light" type="submit" name="action">
                          Сохранить
                          <i className="material-icons right">send</i>
                      </button>
                  </div>
              </form>
          </div>
      </div>
    )
  }
}

SkillsUpdate.propTypes = {
 revision: PropTypes.object.isRequired,
 callback: PropTypes.func
}
