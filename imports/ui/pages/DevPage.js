import React, { Component, PropTypes } from 'react'
import ThreadsInsert from '../components/ThreadsInsert'
import RevisionsList from '../components/RevisionsList'
import List from '../components/List'
import Loading from '../components/Loading'
import { Row, Col, CardPanel } from 'react-materialize'

class DevPage extends Component {
  render() {
    const {props} = this
    return props.loaded ? (
      <section>
        <ThreadsInsert parent={props.parent} type="dev" />
        <Row>
			<Col s={12}>
				<CardPanel className="center-align">
				   <a href={`/reminders/${props.parent}`}>
						Карточки
				   </a>
			   </CardPanel>
		   </Col>
            <Col s={12} m={6}>
                <CardPanel className="center-align">
                   <a href={`/manifest/${props.parent}`}>
                    	Манифест
                   </a>
                </CardPanel>
            </Col>
            <Col s={12} m={6}>
                <CardPanel className="center-align">
                    <a href={`/scholar/${props.parent}`}>
                    	Потенциальная картина ученика
                    </a>
                </CardPanel>
            </Col>
       </Row>
       <Row>
			<List
            name="Обсуждения"
            items={props.threads}
            numberOfItems={props.numberOfThreads}
            type="dev"
            href="thread"
            className="col s12 m6"
            onChangePage={props.changePage.bind(this, 'threads')}
            />
			<RevisionsList
            name="История"
            items={props.revisions}
            numberOfItems={props.numberOfRevisions}
            votes={true}
            href="revision"
            className="col s12 m6"
            onChangePage={props.changePage.bind(this, 'revisions')}
            />
       </Row>
   </section>
    ) : <Loading />
  }
}

DevPage.propTypes = {
 parent: PropTypes.string.isRequired,
 loaded: PropTypes.bool.isRequired,
 revisions: PropTypes.array.isRequired,
 threads: PropTypes.array.isRequired,
 numberOfThreads: PropTypes.number.isRequired,
 numberOfRevisions: PropTypes.number.isRequired,
 changePage: PropTypes.func.isRequired
}

export default DevPage
