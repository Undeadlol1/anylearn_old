import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { injectProps } from 'relpers';
import Blaze from 'meteor/gadicc:blaze-react-component'
import MoodsInsert from '../../components/MoodsInsert'
import NodesInsert from '../../components/NodesInsert'
import { Show, Else } from '../../components/Utils'

const title = <a href="/mood" style={{color: 'rgb(48, 48, 48)'}}>Mood</a>
const loginButton = <Blaze template="atNavButton" />

export default class MoodNavBar extends Component {

    static propTypes = {
        mood: PropTypes.bool,
        node: PropTypes.bool
    }

    @injectProps
    render({children, mood, node}) {
        const slug = FlowRouter.getParam("moodSlug")
        return  <AppBar
    			    title={title}
        			iconElementRight={
                        <span>
                            <Show condition={Meteor.userId()}>
                                { mood ? <MoodsInsert /> : null }
                                { node ? <NodesInsert parent={slug} /> : null }
                            </Show>
                            <Else condition={Meteor.userId()}>
                                <Blaze template="atNavButton" />
                            </Else>
                        </span>
                    }
    			/>
        }
}
