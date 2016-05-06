import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

export default class ThreadsInsert extends Component {
  handleThreadsInsert(e){
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
            ReactDOM.findDOMNode(this.refs.text).value = '';
          }
      }
    )
  }

  render() {
    return (
      <div className="row section">
        <div className="col s12">
          <h4 className="center-align">Добавить обсуждение</h4>
          <form onSubmit={this.handleThreadsInsert.bind(this)}>
            <div className="input-field">
              <input ref="name" id="thread-name" type="text" required />
              <label for="thread-name">Название обсуждения</label>
            </div>
              <div className="input-field">
                <textarea ref="text" className="materialize-textarea" required></textarea>
                <label>Детали</label>
              </div>
              <div className="input-field center-align">
                <button className="btn waves-effect waves-light" type="submit">Сохранить
                  <i className="material-icons right">send</i>
                </button>
              </div>
          </form>
        </div>
      </div>
    )
  }
}
/*ThreadsInsert.defaultProps = {
  label: '',
  text: ''
}*/
ThreadsInsert.propTypes = {
  parent: PropTypes.string.isRequired
  //type: PropTypes.string.isRequired
}
