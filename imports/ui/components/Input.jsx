import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'

export default class Input extends Component {
  handleInput(e){
    e.preventDefault()
    // get values for method call
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim()
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim()
    const type = this.props.type
    const parent = this.props.parent
    Meteor.call('threads.insert', { name, text, type, parent },
      (err, result) => {
          if (err) console.log(err)
          else {
            // Clear form
            ReactDOM.findDOMNode(this.refs.name).value = '';
            $(this.refs.name).blur()
            ReactDOM.findDOMNode(this.refs.text).value = '';
            $(this.refs.text).blur()
          }
      }
    )
  }

  render() {
    return (
      (
        <div className="row section">
          <div className="col s12">
            <h4 className="center-align">Добавить обсуждение</h4>
            <form onSubmit={this.handleThreadsInsert.bind(this)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input ref="name" id="thread-name" type="text" required />
                    <label for="thread-name">Название обсуждения</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea ref="text" className="materialize-textarea" required></textarea>
                    <label>Детали</label>
                  </div>
                </div>
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
    )
  }
}
/*Input.defaultProps = {
  label: '',
  text: ''
}*/
Input.propTypes = {
  parent: PropTypes.string.isRequired
  //type: PropTypes.string.isRequired
}
