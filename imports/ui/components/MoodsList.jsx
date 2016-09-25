import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-materialize'
import {Card, CardMedia, CardTitle} from 'material-ui/Card'

class MoodsList extends Component {
    /*_learnIt(_id) {
		if (!Meteor.userId()) return Materialize.toast('Пожалуйста, залогинтесь', 4000)
        Meteor.call('users.toggleLearning', _id, (err, result) =>{
            if(err) Materialize.toast(`Ошибка! Что-то пошло не так.`, 4000)
            else Materialize.toast( result ? `Навык добавлен в список обучения` : `Навык убран из списка обучения`, 4000)
        })
    }*/
	render() {
		const {props, _learnIt} = this
		const renderItems = () => {
		    if(props.moods.length) {
		        return props.moods.map( mood => {
						const node = props.nodes.find(node => node.parent == mood.slug)
                        const src = node && node.content
                                    ? `http://img.youtube.com/vi/${node.content}/0.jpg`
                                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
						return	<Col s={12} m={4} l={4} key={mood.id}>
									<a href={`/mood/${mood.slug}`}>
										<Card>
											<CardMedia overlay={<CardTitle title={mood.name} />}>
                                                <img src={src} />
											</CardMedia>
										</Card>
									</a>
								</Col>
				})
			}
			// 		const node = props.nodes.find(node => node.parent == mood.slug )
			// 		return 	<Col s={12} m={4} l={3} key={mood._id}>
			// 			        <a className='card large' href={`/mood/${mood.slug}`}>
			// 			            <div className="card-image">
			// 			            	<img src={node && node.content ? `http://img.youtube.com/vi/${node.content}/0.jpg` : ''} />
			// 			            	<span className="card-title">{mood.name}</span>
			// 			            </div>
			// 					</a>
			// 				</Col>
			//
			//
			//
		    //   })
		    // }
		    else return	<div className={(props.className || 'col s12')}>
							<ul className="collection">
								<li className="collection-item center-align">
				                    <b>
				                        <i>Список пуст...</i>
				                    </b>
				            	</li>
					        </ul>
				    	</div>
		}
		return  <Row> {renderItems()} </Row>
	}
}

MoodsList.propTypes = {
  moods: PropTypes.array.isRequired,
  nodes: PropTypes.array.isRequired
}

export default MoodsList
