import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

Meteor.methods({
  'users.subscribe'(skillId){
    check(skillId, String)
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const user = Meteor.user()
    if (user.profile && user.profile.skills && user.profile.skills.indexOf(skillId) != -1) {
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
  }
})


/*Meteor.users.deny({
  update: function (userId, doc, fields, modifier) {
    // can't change admin rights
  //  console.log(modifier);
  //  console.log(doc);
  //  return _.has(doc.profile, isAdmin)
  //  return _.contains(fields, 'isAdmin');
    //  return _.contains(fields, {profile:isAdmin});
  },
  fetch: ['profile']
});
//Meteor.users.update("b3ZxtJW66NCjgh3Nk", {$set:{'profile.isAdmin': false}})
*/
