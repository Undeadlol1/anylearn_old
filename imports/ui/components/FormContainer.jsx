import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'

export default class FormContainer extends Component {

  _handleChange(name, event){
    console.log(name);
    console.log(event.target.value);
    this.setState({data: {[name]: event.target.value}})
    //this.state.data[name] = event.target.value
  }

  _handleSubmit(event){
    event.preventDefault()
    console.log(this.state.data)
    const data = this.state.data
    // if there is a "type" set state to it
    console.log(data);
    if (this.props.type) this.setState({data: {type: this.props.type}})
    // if thre is a preset, call method instead of passing back data on submit
    //    if (this.props.preset)
    Meteor.call(this.props.preset, data, (err, result)=>{
      if (err) console.log(err)
      else this.setState({data:{}})
    })
    // pass data and event back to form (parent)
    //else this.props.onSubmit(data, event)
  }

  render() {
    const wrapElement = (element) => {
      //element = Object.keys(element)[0]
      for (var first in element) break
      element = element[first]
      //console.log(element.props);
      switch (first) {
        case 'text':
          return (
            <div className="input-field col s12" onChange={this._handleChange.bind(this, first)}>
              <input type="text" />
              <label>{element.label}</label>
            </div>
          )
        case 'email':
          return (
            <div className="input-field col s12" onChange={this._handleChange.bind(this, first)}>
              <input  type="email" />
              <label>{element.label}</label>
            </div>
        )
        case 'checkbox':
          return (
            <div className="input-field col s12" onChange={this._handleChange.bind(this, first)}>
              <input  type="checkbox" />
              <label>{element.label}</label>
            </div>
        )
        case 'textarea':
          return (
            <div className="input-field col s12" onChange={this._handleChange.bind(this, first)}>
              <textarea className="materialize-textarea"></textarea>
              <label>{element.label}</label>
            </div>
          )
        default:
          console.error(`Can't find proper elements in array.\nYou probably misspeled something`)
      }
    }
    const elements = this.props.elements.map((element, index)=>{
      return (
        <div className="row" key={index}>
            {wrapElement(element)}
        </div>
      )
    })
    return (
       <div className="row section">
        <div className="col s12">
          <h4 className="center-align">{this.props.title}</h4>
          <form onSubmit={this._handleSubmit.bind(this)}>
            {elements}
              <div className="row">
                <div className="input-field center-align">
                  <button className="btn waves-effect waves-light" type="submit">Сохранить
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
          </form>
        </div>
      </div>
    )
  }
}
