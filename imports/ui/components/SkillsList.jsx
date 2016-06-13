import React, { Component, PropTypes } from 'react'
//import Pagination from './Pagination'

class SkillsList extends Component {
  _createMarkup(__html) { return {__html} }
  render() {
    const p = this.props
    const renderItems = () => {
        // if items exist render them, else show empty list
        if(p.skills.length != 0){
          return p.skills.map(item => {
            let text = ''
            try {// find revision and return first chunk of text
                const revision = p.revisions.find(r => { return r.parent == item._id })
                const firstChunk = revision.text[0].indexOf('</p>')
                const maxChars = 200
                // if there is too much text to show limit it by maxChars
                if (firstChunk > maxChars) text = revision.text[0].slice(0, maxChars) + '...'
                // or show firstChunk
                else text = revision.text[0].slice(0, firstChunk) + '...'
            } catch (e) {}
            return  <li key={item._id} className="collection-item avatar">
                      <a href={`/s/${item.slug}`}>
                        <i className="material-icons circle">folder</i>
                        <span className="title">{item.name}</span>
                        <p dangerouslySetInnerHTML={this._createMarkup(text)}></p>
                        <span href="#!" className="secondary-content"><i className="material-icons">grade</i></span>
                      </a>
                    </li>
          })
        }
        else {
          return (
                    <li className="collection-item center-align">
                        <b>
                            <i>Список пуст...</i>
                        </b>
                    </li>
          )
        }
    }
    return (
      <div className={ !p.className ? 'row' : ''}>
          <div className={(p.className || 'col s12')}>
              <ul className="collection">
                {renderItems()}
              </ul>
          </div>
    </div>
    )
  }
}
SkillsList.defaultProps = {
  skills: [],
  revisions: []
}
SkillsList.propTypes = {
  skills: PropTypes.array.isRequired,
  revisions: PropTypes.array.isRequired
}

export default SkillsList
