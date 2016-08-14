import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import {_} from 'meteor/underscore'
import {$} from 'meteor/jquery'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Row, Col } from 'react-materialize'
import Wysiwyg from './Wysiwyg'

export default class SkillsUpdate extends Component {
	state = {
      text: this.props.revision.text,//['', '', '', ''],
      name: '',
	  image: this.props.revision.image,// '',
      description: ''
    }

  componentDidMount(){ $(this.refs.tabs).tabs()  }

  componentWillUnmount() {  $(this.refs.tabs).remove() }

  _handleTextChange(position, text){
    let array = this.state.text
    // set changed text to right position in array
    array[position] = text
    // prevent array values from being undefined
    // i have no idea why i am using this constructs, i feel stupid today
    let newArray = ['', '', '', '']
    array.forEach((item, index)=>{
      if(item == '' || item == '' || !item) newArray[index] = this.props.revision.text[index]
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
    const {parent, _id} = this.props.revision
    const data = _.extend(this.state, { parent, previous: _id })
    // try sending data
	data.text = data.text.filter(item => !!item)
	  if (data.text == this.props.text) throw new Error("You didn't change anything!")
	  else if (_.isEmpty(data.text)) data.text = this.props.revision.text // if text is untouched use initial instead of empty state
	  console.log(data)
	  Meteor.call('revisions.update', data,
	    (err) => {
	        if (err) Materialize.toast(`Произошла ошибка! ${err.message}`, 4000)
	        else {
	            Materialize.toast('Сохранено!', 4000)
	            this.props.callback() // call callback if there is one
	            FlowRouter.go(`/s/${FlowRouter.getParam('skillSlug')}`)
	        }
	    }
	  )
  }

  render() {
    const {text, image} = this.props.revision
    const {_handleChange, _handleTextChange, _handleSkillsUpdate} = this
    return (
    <div className="row card-panel" {...this.props}>
        <Col s={12}>
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
        </Col>
        <Col s={12}>
            <form onSubmit={_handleSkillsUpdate.bind(this)}>
				<Wysiwyg id="stage1" text={text[0]} onChange={_handleTextChange.bind(this, 0)} />
				<Wysiwyg id="stage2" text={text[1]} onChange={_handleTextChange.bind(this, 1)} />
				<Wysiwyg id="stage3" text={text[2]} onChange={_handleTextChange.bind(this, 2)} />
				<Wysiwyg id="stage4" text={text[3]} onChange={_handleTextChange.bind(this, 3)} />
				<Row>
					<div className="input-field col s12">
						<input onChange={_handleChange.bind(this, 'name')} type="text" required />
						<label>Название изменения</label>
					</div>
				</Row>
				<Row>
					<div className="input-field col s12">
						<textarea onChange={_handleChange.bind(this, 'description')} className="materialize-textarea"></textarea>
						<label>Описание изменения (желательно)</label>
					</div>
				</Row>
				<Row>
					<div className="input-field col s12">
						<input value={image} onChange={_handleChange.bind(this, 'image')} type="url" />
						<label className="active">Изменить логотип (не обязательно)</label>
					</div>
				</Row>
				<div className="row center">
					<button className="btn waves-effect waves-light" type="submit" name="action">
						Сохранить
						<i className="material-icons right">send</i>
					</button>
				</div>
            </form>
        </Col>
    </div>
    )
  }
}

SkillsUpdate.propTypes = {
 revision: PropTypes.object.isRequired,
 callback: PropTypes.func
}
