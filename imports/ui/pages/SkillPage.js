import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import get from 'oget'
import { FlowRouter } from 'meteor/kadira:flow-router'
import SkillStages from '../components/SkillStages'
import SkillsUpdate from '../components/SkillsUpdate'
import ThreadsInsert from '../components/ThreadsInsert'
import Interview from '../components/Interview'
import List from '../components/List'
import Loading from '../components/Loading'
import { Row, Col } from 'react-materialize'

class SkillPage extends Component {
  constructor(props){
    super(props)
    // none of this are necessery
    // state variables are false by default
    this.state = {curating: false, edit: false, stage: 0}
	this.toggleCurating = this.toggleCurating.bind(this)
	this._toggleEdit = this._toggleEdit.bind(this)
	this.changePage = this.changePage.bind(this)
	this._skillUpdated = this._skillUpdated.bind(this)
  }
	_toggleEdit(){
		const {edit} = this.state
		if (edit && !confirm('Вы уверены? Не сохраненные изменения будут потеряны!')) return
		this.setState({edit: !edit})
	}
	toggleCurating(e){
	    e.preventDefault()
		if (!Meteor.userId()) Materialize.toast('Пожалуйста, залогинтесь', 4000)
	    Meteor.call('users.toggleCurating', this.props.skillId,
	            (err, result)=> {
	                if (err) Materialize.toast(`Ошибка! Что-то пошло не так. ${err.error}`, 4000)
					else {
						Materialize.toast( result ? `Навык добавлен в список курирования` : `Навык убран из списка курирования`, 4000)
						this.setState({curating: true})
					}
		})
	}
	changePage(e) {
		skipThreads.set(e.selected * perPage)
	}
	_skillUpdated() {
		this.setState({edit: false})
	}
  render() {

	const { props, state, _toggleEdit, changePage, toggleCurating, _skillUpdated } = this
	const showIcon = _.contains(get(Meteor.user(), 'profile.curating'), props.skillId)
	const iconClass = showIcon ? 'turned_in' : 'turned_in_not'

    return props.loaded ? (
		<section>
	        <Row className="section row">
	            <Col s={12} className="card-panel">
	                <div style={{overflow: 'auto', paddingTop: 15}}>
	                  <div onClick={_toggleEdit} className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
	                    <a href="" className="btn-floating btn-large waves-effect waves-light">
	                      <i className="large material-icons">
	                          {state.edit ? 'not_interested' : 'mode_edit'}
	                      </i>
	                    </a>
	                  </div>
	                  <a href={`/s/${props.skill.slug}/dev`} className="btn waves-effect waves-light right">Обсуждение
	                    <i className="material-icons right">list</i>
	                  </a>
	                  <a className="waves-effect waves-blue btn-flat left" title="подписаться" onClick={toggleCurating}>
	                    <i className="material-icons center-align">{iconClass}</i>
	                  </a>
	                </div>
	                <h1 style={{marginTop: 10}} className="center-align">{props.skill.name}</h1>
	            </Col>
	        </Row>
	        {state.edit ? <SkillsUpdate revision={props.revision} callback={_skillUpdated} /> : <SkillStages text={props.revision.text} />}
	        <Interview parent={props.skillId} response={props.response} />
	        <ThreadsInsert parent={props.skillId} type="skill" />
	        <List
	          name="Обсуждения"
	          items={props.threads}
	          href="thread"
	          numberOfItems={props.numberOfThreads}
	          onChangePage={changePage}
			/>
		</section>
    ) : <Loading />
  }
}

SkillPage.propTypes = {
 skill: PropTypes.object.isRequired,
 revision: PropTypes.object.isRequired,
 response: PropTypes.object.isRequired,
 threads: PropTypes.array.isRequired
}
export default SkillPage
