import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import FormContainer from './FormContainer'

export default class Form extends Component {

  _choosePreset() {
    switch (this.props.preset) {
      case "threads.insert":
        return {
          title: "Добавить обсуждение",
          elements: [{
            text: {
              label: 'Название обсуждения',
              props: `required`
            }
          }, {
            textarea: {
              label: 'Детали',
              props: ``
            }
          }]
        }
        break
    }
  }

  render() {
    const preset = this._choosePreset()
    return <FormContainer title={preset.title} elements={preset.elements} />
  }

}
 /*
   _handleSubmit(event){
     event.preventDefault()
     // if elements not been touched make remove it
     console.log(this.state.elements)
     const elements = this.state.elements.filter((item, index)=>{
       // if elements is an anything other than string it will generete error
       try {
        return this.props.elements[index] != item
       } catch (e) {
         return false
       }
     })
     // if there is a type setstate to it
     console.log(elements);
     if (this.props.type) this.setState({type: this.props.type})
     // if thre is a preset, call method instead of passing back data on submit
     if (this.props.preset) Meteor.call(this.props.preset, elements, (err, result)=>{
       if (err) console.log(err)
       else this.setState({elements:[]})
     })
     // pass data and event back to form (parent)
     else this.props.onSubmit(elements, event)
   }*/
