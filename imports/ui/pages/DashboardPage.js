import React, { Component, PropTypes } from 'react'
//import {$} from 'meteor/jquery'
import { FlowRouter } from 'meteor/kadira:flow-router'
import Loading from '../components/Loading'
import List from '../components/List'
import { Row, Col, CardPanel } from 'react-materialize'

class DashboardPage extends Component {
	findText() {}
    render() {
        const { props, state } = this
        return props.loaded ? (
			<div>
			  <Row className="section">
			    <Col s={12}>
			      <CardPanel>
			          {props.skills.map((item) => <p key={item._id}>{item.name}</p>)}
			      </CardPanel>
			    </Col>
			  </Row>
			  <Row className="section">
				<Col s={12}>
				  <CardPanel className="light-blue base white-text">
					  Вопросы - ответы
				  </CardPanel>
				</Col>
			  </Row>
			  <Row className="section">
			    <Col s={12}>
			      <CardPanel>
			          <p>Текст</p>
			          <p>Текст</p>
			          <p>Текст</p>
			      </CardPanel>
			    </Col>
			  </Row>
			</div>
        ) : <Loading />
  }
}

DashboardPage.propTypes = {
 //skill: PropTypes.object.isRequired
}
export default DashboardPage
