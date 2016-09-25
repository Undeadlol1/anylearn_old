import { FlowRouter } from 'meteor/kadira:flow-router'
import bodyParser from 'body-parser'
import { Meteor } from 'meteor/meteor'
import { getNodes, insertNode } from './nodes.js';
import { getMood, getMoods, insertMood } from './moods.js';

/**
 * middleware
 */
Picker.middleware(bodyParser.json())
Picker.middleware(bodyParser.urlencoded({ extended: false }))

/**
 * moods
 */
Picker.route('/api/moods/:moodId', function({moodId}, req, res, next) {
     getMood(moodId, (err, result) => { res.end(err ? err : result) })
})
Picker.route('/api/moods', function(params, req, res, next) {
    getMoods((err, result) => { res.end(err ? err : result) })
})
Picker.route('/api/moods/post', function(params, req, res, next) {
    insertMood(req.body, function(err, result) {
        res.end(err ? err : result)
    })
})

/**
 * nodes
 */
Picker.route('/api/nodes', function(params, req, res, next) {
    getNodes((err, result) => { res.end(err ? err : result) })
})
Picker.route('/api/nodes/post', function(params, req, res, next) {
    console.log('insertNode is about to launch')
    console.log(req.body)
    insertNode(req.body, function(err, result) {
	    res.end(err ? err : result)
    })
})
