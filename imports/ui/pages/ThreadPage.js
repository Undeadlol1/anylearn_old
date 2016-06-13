import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Threads } from '../../api/threads.js';
//import { Comments as Comms } from '../../api/comments.js'
import List from '../components/List'
import Loading from '../components/Loading'
import Comments from '../components/Comments'


class ThreadPage extends Component {
  _handleSubmit(e){
    e.preventDefault()
    // get values for method call
    const text = ReactDOM.findDOMNode(this.refs.text).value // .trim()
    const parent = this.props.parent
    // call method
    Meteor.call('comments.insert', {text, parent}, (err, result) => {
        if (err) { console.log(err) }
        else {
            ReactDOM.findDOMNode(this.refs.text).value = ''
            // trigger blur to animate label back in place (materializecss bug)
            $(this.refs.text).blur()
        }
    })
  }
  render() {
    const renderComments = () => {
      if (this.props.comments && this.props.comments.length > 0) {
        return this.props.comments.map(comment => {
          return (
            <li key={comment._id} className="collection-item avatar">
              <i className="material-icons circle">folder</i>
              <span className="title">{comment.username}</span>
              <p>{comment.text.map((item) => {return '<p>${item}</p>'})}</p>
            {/* <!-- <a href="" className="secondary-content black-text"><i class="material-icons">more_vert</i></a> --> */}
            </li>
          )
        })
      } else {
        return (
            <li className="collection-item center-align">
                <b>
                    <i>Список пуст...</i>
                </b>
            </li>
        )
      }
    }
    return this.props.loaded ? (
      <section>
        <div className="row">
          <h1 className="center-align">{this.props.name}</h1>
            <div className="col s12">
              <div className="card-panel light-blue base">
                <span className="white-text">{this.props.text}</span>
              </div>
            </div>
            {/*<div className="col s12">
                <form onSubmit={this._handleSubmit.bind(this)}>
                  <div className="row">
                    <div className="col s12 input-field">
                        <textarea ref="text" className="materialize-textarea" required></textarea>
                        <label>Комментарий</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 input-field">
                        <button className="btn waves-effect waves-light" type="submit">Сохранить
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                  </div>
                </form>
            </div>*/}
        </div>
        <div className="row">
          <div className="col s12">
            <h4 className="center-align">Комментарии</h4>
            {/*<ul className="collection">
              {renderComments()}
            </ul>*/}
          </div>
        </div>
        <Comments />
      </section>
    ) : <Loading />
  }
}

ThreadPage.propTypes = {
 name: PropTypes.string.isRequired,
 text: PropTypes.string,
 //comments: PropTypes.array.isRequired,
 parent: PropTypes.string.isRequired
}

export default createContainer(() => {
  const parent = FlowRouter.getParam('threadId')
  const threadsReady = Meteor.subscribe('threads', parent).ready()
  //const commentsReady = Meteor.subscribe('comments', {parent}).ready()
   /*, {
        limit: parseInt(this.perPage),
        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        sort: this.getReactively('sort')
    }*/
  const thread = Threads.findOne()
  return {
      name: thread ? thread.name : '',
      text: thread ? thread.text : '',
      comments: Comms.find().fetch(),
      loaded: threadsReady, //&& commentsReady,
      parent
  }
}, ThreadPage)
