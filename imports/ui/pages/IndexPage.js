import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import { Skills } from '../../api/skills.js'
import List from '../components/List'
import Loading from '../components/Loading'

class IndexPage extends Component {
  _handleSubmit(result, event){
    event.preventDefault()
    console.log(result)
  }
  render() {
    return this.props.loaded ? (
      <div>
        <div className="row section">
          <div className="col s12">
            <div className="card-panel light-blue base">
              <span className="white-text">
                AnyLearn – это библиотека навыков, созданная открытым сообществом. Каждый может вносить изменения. Любой может делиться знаниями.
              </span>
            </div>
          </div>
        </div>
        <List name="Навыки" items={this.props.skills} href="skill" />
    </div>
    ) : <Loading />
  }
}

IndexPage.propTypes = {
 skills: PropTypes.array.isRequired
}

export default createContainer(() => {
    const loaded = Meteor.subscribe('skills',
    {},
    {
      sort: {
          createdAt: -1
      }
    }).ready()
    const skills = Skills.find({}).fetch()
    return { skills, loaded }
}, IndexPage)
