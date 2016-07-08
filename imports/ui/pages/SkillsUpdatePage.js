import React, { Component, PropTypes } from 'react'
import SkillsUpdate from '../components/SkillsUpdate'

class SkillsUpdatePage extends Component {
  render() {
    return <SkillsUpdate skillName={this.props.skillName} revision={this.props.revision} className="section"/>
  }
}

SkillsUpdatePage.propTypes = {
 skillName: PropTypes.string.isRequired,
 revision: PropTypes.object.isRequired
}

export default SkillsUpdatePage
