import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
const JsDiff = require('diff')

/* THIS PART IS UNFINISHED */
// perfomance optimisation is not an issue now so this is temporary abandoned
export const Diffs = new Mongo.Collection('diffs')

if (Meteor.isServer) {
  Meteor.publish('diffs', function diffsPublication(
    selector = {},
    options = {}
    ) { return Diffs.find(selector, options) })
}

Meteor.methods({
  'diffs.insert' (data) {
    //check(data.why, String)
    //check(data.exp, String)
    //check(data.parent, String)

    // Make sure the user is logged in before inserting
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    // do not allow multiple diffs
    const __html = JsDiff
                  .diffTrimmedLines(this.props.first, this.props.second)
                  .map(function(part, index){
                        // added = 'green', removed = 'red', else = ''
                        const color = part.added ? 'green' : part.removed ? 'red' : ''
                        if (!color) return null // do not return untouched bits
                        return `<div key=${index} style="background-color: ${color};">${part.value}</div>`
                  })
                  .join('')
  }
})
