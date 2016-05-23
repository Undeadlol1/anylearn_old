import '../imports/api/skills.js';
import '../imports/api/revisions.js';
import '../imports/api/forums.js';
import '../imports/api/threads.js';
import '../imports/api/comments.js';
import '../imports/api/posts.js';
import '../imports/api/notifications.js';
import '../imports/api/manifests.js';
import '../imports/api/suggestions.js';
import '../imports/api/votes.js';
import '../imports/api/users.js';
import './fixtures'



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
