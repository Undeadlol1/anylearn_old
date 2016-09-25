import '../imports/api/skills'
import '../imports/api/revisions'
import '../imports/api/forums'
import '../imports/api/threads'
import '../imports/api/notifications'
import '../imports/api/manifests'
import '../imports/api/suggestions'
import '../imports/api/votes'
import '../imports/api/responses'
import '../imports/api/users'
import '../imports/api/diffs'
import '../imports/api/progress'
// mood
import '../imports/api/moods'
import '../imports/api/nodes'
import '../imports/api/decisions'
import '../imports/api/rest/routes'
// migrations
import './migrations'

//Roles.addUsersToRoles(['9ALePYrckDSWZMFqz', 'E9X38jArvXk2wW6fJ'], ['admin'])


import { Skills } from '../imports/api/skills'
import { Revisions } from '../imports/api/revisions'
import { Votes } from '../imports/api/votes'

/*Skills.find({}, {
	$rename: {
		'author': 'userId',
		'revison': 'revisionId'
	}
}, {
   multi: true
})
Revisions.find({}, {
	$rename: {'author': 'userId'}
}, {
   multi: true
})
Votes.find({}, {
	$rename: {
		'author': 'userId',
		'value': 'choice'
	}
}, {
   multi: true
})
*/
// update documents
/*if (Meteor.isServer) {
	Meteor.startup(function(){
		Skills.update({}, {
			$rename: {
				revision: 'revisionId',
				author: 'userId'
			}
		}, {
			multi: true
		})
		Revisions.update({}, {
				$rename: {
					value: 'choice',
					author: 'userId'
				}
			}, {
				multi: true
		})
		Votes.update({}, {
				$rename: {
					value: 'choice',
					author: 'userId'
				}
			}, {
				multi: true
		})
	})
}*/
