import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import get from 'oget'

if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication(
    selector = {},
    options = {}
  ) {
    return Meteor.users.find(selector, options)
  })
}

Meteor.methods({
  'users.toggleLearning'(skillId){
      check(skillId, String)

	  const user = Meteor.user()
	  if (!user) throw new Meteor.Error('not-logged-in')

      if ( _.contains(get(user, 'profile.learning', []), skillId) ) {
          Meteor.users.update(user._id, {
              $pull: {
                  'profile.learning': skillId
              }
          })
          return false
      } else {
          Meteor.users.update(user._id, {
              $push: {
                  'profile.learning': skillId
              }
          })
          return true
      }
},
'users.toggleCurating'(skillId){
    check(skillId, String)

	const user = Meteor.user()
    if (!user) throw new Meteor.Error('not-logged-in')

	if ( _.contains(get(user, 'profile.curating', []), skillId) ) {
        Meteor.users.update(user._id, {
            $pull: {
                'profile.curating': skillId
            }
        })
        return false
    } else {
        Meteor.users.update(user._id, {
            $push: {
                'profile.curating': skillId
            }
        })
        return true
    }
    }
	  /*'users.subscribe'(skillId){
	    check(skillId, String)
	    if (!Meteor.userId()) {
	      throw new Meteor.Error('not-logged-in');
	    }
	    const user = Meteor.user()
	    if ( _.contains(get(user, 'profile.skills', []), skillId) ) {
	        Meteor.users.update(user._id, {
	            $pull: {
	                'profile.skills': skillId
	            }
	        })
	    } else {
	        Meteor.users.update(user._id, {
	            $push: {
	                'profile.skills': skillId
	            }
	        })
	    }
	  },*/
})
