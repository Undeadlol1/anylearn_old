import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
//import Pagination from './Pagination'

class SkillsList extends Component {
    _learnIt(_id) {
		if (!Meteor.userId()) return Materialize.toast('Пожалуйста, залогинтесь', 4000)
        Meteor.call('users.toggleLearning', _id, (err, result) =>{
            if(err) Materialize.toast(`Ошибка! Что-то пошло не так.`, 4000)
            else Materialize.toast( result ? `Навык добавлен в список обучения` : `Навык убран из списка обучения`, 4000)
        })
    }
  _createMarkup(__html) { return {__html} }
  render() {
    const {props, _learnIt} = this
    const renderItems = () => {
        // if items exist render them, else show empty list
        if(props.skills.length) {
            return props.skills.map( skill => {
			let revision,
				text
            try {// find revision and return first chunk of text
                revision = props.revisions.find(r => { return r.parent == skill._id })
                const firstChunk = revision.text[0].indexOf('</p>')
                const maxChars = 200
                // if there is too much text to show limit it by maxChars
                if (firstChunk > maxChars) text = revision.text[0].slice(0, maxChars) + '...'
                // or show firstChunk
                else text = revision.text[0].slice(0, firstChunk) + '...'
            } catch (e) {}
            return  <li key={skill._id} className="collection-item avatar">
						{
							revision.image
							? <img src={revision.image} className="circle" />
							: <i className="material-icons circle">folder</i>
						}
                        <a href={`/s/${skill.slug}`} className="title">{skill.name}</a>
                        <a
							href={`/s/${skill.slug}`}
							dangerouslySetInnerHTML={this._createMarkup(text)}
						>
						</a>
                        <a
							onClick={_learnIt.bind(this, skill._id)}
							title="Учиться навыку"
							style={{top: 10, right: 8}}
							className="secondary-content"
							href=""
						>
							<i className="material-icons">note_add</i>
						</a>
						<p>
							<span>Учителей: {skill.curatingCount}</span>
							<span className="right">Учеников: {skill.learningCount}</span>
						</p>
                    </li>
          })
        }
        else return <li className="collection-item center-align">
                        <b>
                            <i>Список пуст...</i>
                        </b>
                	</li>
    }
    return (
      <div className={ !props.className ? 'row' : ''}>
          <div className={(props.className || 'col s12')}>
              <ul className="collection">
                {renderItems()}
              </ul>
          </div>
    </div>
    )
  }
}
SkillsList.propTypes = {
  skills: PropTypes.array.isRequired,
  revisions: PropTypes.array.isRequired
}

export default SkillsList
