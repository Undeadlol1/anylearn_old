import React, { Component, PropTypes } from 'react'
import TinyMCE from 'react-tinymce'
import {$} from 'meteor/jquery'
//import { createContainer } from 'meteor/react-meteor-data'
//import { Meteor } from 'meteor/meteor'

export default class SkillStages extends Component {
  componentDidMount(){
    $(this.refs.tabs).tabs()
  }
  createMarkup(__html) {
    return {__html}
  }
  render() {
    return (
      <div className="row">
          <div className="col s12">
              <ul className="tabs" ref="tabs">
                  <li className="tab col s3">
                      <a className="active" href="#stage1">Новичок</a>
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
          <div dangerouslySetInnerHTML={this.createMarkup(this.props.text[0])} id="stage1" className="col s12"></div>
          <div dangerouslySetInnerHTML={this.createMarkup(this.props.text[1])} id="stage2" className="col s12"></div>
          <div dangerouslySetInnerHTML={this.createMarkup(this.props.text[2])} id="stage3" className="col s12"></div>
          <div dangerouslySetInnerHTML={this.createMarkup(this.props.text[3])} id="stage4" className="col s12"></div>
      </div>
    )
  }
}
SkillStages.defaultProps = {
  text: ['', '', '', '']
}
SkillStages.propTypes = {
  //label: PropTypes.string.isRequired,
  text: PropTypes.array.isRequired
}