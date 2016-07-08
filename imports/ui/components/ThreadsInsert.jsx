import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'

export default class ThreadsInsert extends Component {
  constructor(props){
    super(props)
    this.state = {show: false}
  }
  show(){
    this.setState({show: !this.state.show})
  }
  handleThreadsInsert(e){
    e.preventDefault()
    // get values for method call
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim()
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim()
    const { type, parent } = this.props
    //call method
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
    const button = (
      <div className="row section">
        <button
          style={{display: 'block', margin: '0 auto'}}
          onClick={this.show.bind(this)}
          className="btn waves-effect waves-light">
          Добавить обсуждение
          <i className="material-icons right">send</i>
        </button>
      </div>
    )
    const component = (
      <div className="row section">
        <div className="col s12">
          <h4 className="center-align">Добавить обсуждение</h4>
		</div>
		<div className="col s12 card-panel">
          <form onSubmit={this.handleThreadsInsert.bind(this)}>
              <div className="row">
                <div className="input-field col s12">
                  <input ref="name" id="thread-name" type="text" required />
                  <label for="thread-name">Название</label>
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
    return this.state.show ? component : button
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
