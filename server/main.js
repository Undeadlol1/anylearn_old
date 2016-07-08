import '../imports/api/skills'
import '../imports/api/revisions'
import '../imports/api/forums'
import '../imports/api/threads'
import '../imports/api/posts'
import '../imports/api/notifications'
import '../imports/api/manifests'
import '../imports/api/suggestions'
import '../imports/api/votes'
import '../imports/api/responses'
import '../imports/api/users'
import '../imports/api/diffs'
import '../imports/api/progress'
import './fixtures'


Roles.addUsersToRoles(['9ALePYrckDSWZMFqz', 'E9X38jArvXk2wW6fJ'], ['admin'])


/* update slugs for documents
Meteor.startup(function(){
  const docs = Skills.find({ slug: {$exists: false}})
  let count = 0
    docs.forEach( (doc) =>{
      Skills.update({_id:doc._id},{$set:{_id:doc._id}})
      count += 1
    console.log('Update slugs for ' + count + ' Documents.')
  })
})
*/
// This code only runs on the server
// Only publish tasks that are public or belong to the current user
/*  if(Skills.find({userId: 1}).count() >= 0){
  const data = ['First', 'Second', 'Third', 'Fourth']
  data.forEach(function(element, index, array) {
    Skills.insert({
      name: element,
      userId: 1
    })
  })
}*/
