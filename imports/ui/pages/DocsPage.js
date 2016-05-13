import React, { Component } from 'react'
import { introduction } from '../templates'

export default class SkillsInsertPage extends Component {
  render() {
    function createMarkup() { return {__html: introduction} }
    return <div className="row">
            <div className="col s12" dangerouslySetInnerHTML={createMarkup()}></div>
           </div>
  }
}
