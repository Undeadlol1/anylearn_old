import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

/* THIS PART IS UNFINISHED */
// perfomance optimisation is not an issue now so this is temporary abandoned
export const Progress = new Mongo.Collection('progress')

if (Meteor.isServer) {
  Meteor.publish('progress', function progressPublication(
    selector = {},
    options = {}
    ) { return Progress.find(selector, options) })
}

Meteor.methods({
  'progress.insert' (data) {
    //check(data.why, String)
    //check(data.exp, String)
    //check(data.parent, String)

    // Make sure the user is logged in before inserting
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized')
    }
})
