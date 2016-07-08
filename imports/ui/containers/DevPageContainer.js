import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { ReactiveVar } from 'meteor/reactive-var'
import { SubsManager } from 'meteor/meteorhacks:subs-manager'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import { Responses } from '../../api/responses.js'
import DevPage from '../pages/DevPage'

const subsManager = new SubsManager({ cacheLimit: 5, expireIn: 5 })
const perPage = 10
let skipThreads = new ReactiveVar(0)
let skipRevisions = new ReactiveVar(0)

export default DevPageContainer = createContainer(() => {
    const skillsReady =  Meteor.subscribe('skills', {
        slug: FlowRouter.getParam('skillSlug')
    }).ready(),
    skill = Skills.findOne(),
    parent = skill ? skill._id : '',
    revisionsReady = Meteor.subscribe('revisions',
          { parent }
      ).ready(),
    threadsReady =  Meteor.subscribe('threads', {
          parent,
          type: "dev"
      }).ready(),
    revisions = Revisions.find({}, {
        sort: { createdAt: -1 },
        limit: perPage,
        skip: skipRevisions.get()
    }).fetch(),
    threads = Threads.find({}, {
        limit: perPage,
        skip: skipThreads.get()
    }).fetch()
    function changePage(type, e) {
      if (type == 'threads') skipThreads.set(e.selected * perPage)
      else skipRevisions.set(e.selected * perPage)
    }
    return {
      revisions,
      threads,
      changePage,
      parent,
      numberOfThreads: Counts.get('numberOfThreads'),
      numberOfRevisions: Counts.get('numberOfRevisions'),
      loaded: skillsReady && revisionsReady && threadsReady
    }
}, DevPage)
