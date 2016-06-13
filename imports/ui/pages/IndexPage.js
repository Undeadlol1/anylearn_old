import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import SkillsList from '../components/SkillsList'
import Loading from '../components/Loading'
import { Row, Col, CardPanel } from 'react-materialize'


class IndexPage extends Component {
  //_changePage(e) {skip.set(e.selected * perPage)}
  render() {
    return this.props.loaded ? (
      <div>
        <Row className="section">
          <Col s={12}>
            <CardPanel className="light-blue base white-text">
                AnyLearn – это библиотека навыков, созданная открытым сообществом. Каждый может вносить изменения. Любой может делиться знаниями.
            </CardPanel>
          </Col>
        </Row>
        <SkillsList skills={this.props.skills} revisions={this.props.revisions} />
    </div>
    ) : <Loading />
  }
}

IndexPage.propTypes = {
 skills: PropTypes.array.isRequired,
 revisions: PropTypes.array.isRequired,
 numberOfSkills: PropTypes.number.isRequired
}

export default createContainer(() => {
    const perPage = 10
    //let skip = new ReactiveVar(0)
    const skillsReady = Meteor.subscribe('skills',
      {},
      {
        sort: { createdAt: -1 },
        //limit: perPage,
        //skip: skip.get()
    }).ready()
    const revisionsReady = Meteor.subscribe('revisions', {active: true}).ready()
    return {
      skills: Skills.find().fetch(),
      revisions: Revisions.find().fetch(),
      numberOfSkills: Counts.get('numberOfSkills'),
      loaded: skillsReady && revisionsReady
    }
}, IndexPage)
