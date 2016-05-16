import React, { Component } from 'react'
import { introduction } from '../templates'

export default class SkillsInsertPage extends Component {
  createMarkup(__html) {
    return {__html}
  }
  render() {
    return <div className="row">
            <div className="col s12" dangerouslySetInnerHTML={this.createMarkup(introduction)}></div>
           </div>
  }
}
