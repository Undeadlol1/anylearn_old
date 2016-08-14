import React, { Component, PropTypes } from 'react'
import Loading from '../components/Loading'
import SkillsList from '../components/SkillsList'
import { Row, Col, CardPanel, Collection, CollectionItem } from 'react-materialize'

class IndexPage extends Component {
  //_changePage(e) {skip.set(e.selected * perPage)}
  render() {
     const {users, revisions, skills, loaded} = this.props
     const renderUsers = users.sort((first, second) =>{
				                return second.revisionsCount - first.revisionsCount
				        }).map(user => {
				                let name
				                try {
				                    name = user.username || user.profile.name
				                } catch (e) {
				                    name = user._id
				                }
				                if (user.revisionsCount == 0) return
				                return <a href={`profile/${user._id}`} className="collection-item" key={user._id} style={{overflow: 'auto'}}>
				                            <span className="left">{name}</span><span className="right">внесено изменений: <b>{user.revisionsCount}</b></span>
				                        </a>
				        })
    return loaded ? (
      <div>
        <Row className="section">
          <Col s={12}>
            <CardPanel className="light-blue base white-text center">
                AnyLearn – это библиотека навыков, созданная открытым сообществом. Каждый может вносить изменения. Любой может делиться знаниями.
            </CardPanel>
          </Col>
        </Row>
        <SkillsList skills={skills} revisions={revisions} />
        <Row>
           <Col s={12}>
             <ul className="collection with-header">
                <li style={{listStyle: 'none'}} className="collection-header">
					<h5>Самые активные пользователи</h5>
				</li>
                {renderUsers}
            </ul>
          </Col>
        </Row>
    </div>
    ) : <Loading />
  }
}

IndexPage.propTypes = {
 users: PropTypes.array.isRequired,
 skills: PropTypes.array.isRequired,
 revisions: PropTypes.array.isRequired,
 numberOfSkills: PropTypes.number.isRequired
}

export default IndexPage
