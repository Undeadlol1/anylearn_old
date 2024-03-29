import React, { Component, PropTypes } from 'react'
import TinyMCE from 'react-tinymce'
import {$} from 'meteor/jquery'

export default class SkillStages extends Component {

  createMarkup(__html) { return {__html} }

  componentDidMount() { $(this.refs.tabs).tabs() }

  render() {
    const { createMarkup } = this,
            {text, onChangePage} = this.props
    return (
      <div className="row card-panel">
          <div className="col s12">
              <ul className="tabs" ref="tabs">
                  <li className="tab col s3" onClick={onChangePage.bind(this, 0)}>
                      <a className="active" href="#stage1">Новичок</a>
                  </li>
                  <li className="tab col s3" onClick={onChangePage.bind(this, 1)}>
                      <a href="#stage2">Ученик</a>
                  </li>
                  <li className="tab col s3" onClick={onChangePage.bind(this, 2)}>
                      <a href="#stage3">Практикант</a>
                  </li>
                  <li className="tab col s3" onClick={onChangePage.bind(this, 3)}>
                      <a href="#stage4">Мастер</a>
                  </li>
              </ul>
          </div>
          <div dangerouslySetInnerHTML={createMarkup(text[0])} id="stage1" className="col s12"></div>
          <div dangerouslySetInnerHTML={createMarkup(text[1])} id="stage2" className="col s12"></div>
          <div dangerouslySetInnerHTML={createMarkup(text[2])} id="stage3" className="col s12"></div>
          <div dangerouslySetInnerHTML={createMarkup(text[3])} id="stage4" className="col s12"></div>
      </div>
    )
  }
}

SkillStages.defaultProps = { text: ['', '', '', ''] }

SkillStages.propTypes = {
    text: PropTypes.array.isRequired,
    onPageChange: PropTypes.func
}
