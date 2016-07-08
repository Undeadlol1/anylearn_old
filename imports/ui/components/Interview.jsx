import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'

class Interview extends Component {
  _handleSubmit(e){
    e.preventDefault()
    // get values for method call
    const why = ReactDOM.findDOMNode(this.refs.why).value.trim()
    const exp = ReactDOM.findDOMNode(this.refs.exp).value.trim()
    const parent = this.props.parent
    // call insert method
    Meteor.call('responses.insert', { why, exp, parent },
      (err, result) => {
          if (err) console.error(err)
          else {
            // Clear form
            ReactDOM.findDOMNode(this.refs.why).value = null
            $(this.refs.why).blur()
            ReactDOM.findDOMNode(this.refs.exp).value = null
            $(this.refs.exp).blur()
            /* $('input, textarea', this).blur() */
          }
      }
    )
  }
  render() {
      const {_handleSubmit, props: response} = this
    // if interview already been passed do not display component
    return _.isEmpty(response) ? (
        <div className="row">
            <div className="col s12">
              <h4 className="center-align">Опрос</h4>
              <form onSubmit={_handleSubmit.bind(this)} className="card-panel">
                  <div className="row">
                    <div className="input-field col s12">
                      <input ref="why" type="text" id="textInput" required />
                      <label htmlFor="textInput">Зачем вам этот навык?</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea ref="exp" className="materialize-textarea" required></textarea>
                      <label>Есть ли у вас опыт? Если да, то какой?</label>
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
      ) : null
  }
}
Interview.propTypes = {
  parent: PropTypes.string.isRequired,
  response: PropTypes.object.isRequired
}
export default Interview
