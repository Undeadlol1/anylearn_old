import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Suggestions } from '../../api/suggestions.js'
import List from '../components/List'
import Loading from '../components/Loading'


class ManifestPage extends Component {
  _handleSubmit(e){
    e.preventDefault()
    // get values for method call
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim()
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim()
    const parent = this.props.manifestId
    // call method
    Meteor.call('suggestions.insert', { name, text, parent }, (err, result) => {
        if (err) {
            Materialize.toast(`Произошла ошибка! ${err.reason || err.error}`, 4000)
        } else {
            ReactDOM.findDOMNode(this.refs.name).value = ''
            // trigger blur to animate empty input (materializecss bug)
            $(this.refs.name).blur()
            ReactDOM.findDOMNode(this.refs.text).value = ''
            $(this.refs.text).blur()
        }
    })
  }
  render() {
     return this.props.loaded ? (
      <section>
        <div className="row">
            <div className="col s12 card-panel">
              <form name="form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="row">
                 <div className="input-field col s12">
                  <input ref="name" type="text" required />
                  <label>Название</label>
                 </div>
               </div>
               <div className="row">
                  <div className="input-field col s12">
                    <textarea ref="text" className="materialize-textarea"></textarea>
                    <label>Описание</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 center">
                    <button className="btn waves-effect waves-light" type="submit">Сохранить
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </div>
        <List name="Основные положения" items={this.props.suggestions} href="thread" />
      </section>
    ) : <Loading />
  }
}

ManifestPage.propTypes = {
 suggestions: PropTypes.array.isRequired,
 manifestId: PropTypes.string.isRequired
}

export default createContainer(() => {
  const manifestId = FlowRouter.getParam('manifestId')
  const loaded = Meteor.subscribe('suggestions', manifestId
  /*, {
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
  }*/).ready()
  const suggestions = Suggestions.find().fetch()
  return { suggestions, manifestId, loaded }
}, ManifestPage)
