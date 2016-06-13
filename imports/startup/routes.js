import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'
import { Accounts } from 'meteor/accounts-base'
import { Session } from 'meteor/session'
import Blaze from 'meteor/gadicc:blaze-react-component'
import selectn from 'selectn'

// pages
import MainLayout from '../ui/pages/MainLayout.js'
import IndexPage from '../ui/pages/IndexPage'
import SkillPage from '../ui/pages/SkillPage'
import AdminPage from '../ui/pages/AdminPage'
import ProfilePage from '../ui/pages/ProfilePage'
import DevPage from '../ui/pages/DevPage'
import ManifestPage from '../ui/pages/ManifestPage'
import RevisionPage from '../ui/pages/RevisionPage'
import ThreadPage from '../ui/pages/ThreadPage'
import DocsPage from '../ui/pages/DocsPage'
import SkillsInsertPage from '../ui/pages/SkillsInsertPage'
import SkillsUpdatePage from '../ui/pages/SkillsUpdatePage'

function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) redirect('/sign-in')
}
function checkAdmin (ctx, redirect){
    console.log(Meteor.userId())
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        console.warn('You cannot acces that route! Redirecting to main page')
        redirect('/')
    }
}
// filtering
//FlowRouter.triggers.enter([checkAdmin], {only: ['/admin']});

/*const routes = [
  ['/', <IndexPage />],
  ['/welcome', <WelcomePage />],
  ['/radar', <RadarPage />],
  ['/rating', <RatingPage />],
  ['/funds', <FundsPage />]
].forEach( item =>{
    FlowRouter.route(item[0], {
      action() {
        mount(MainLayout, {
          main: item[1]
        })
      }
    })
  })*/


FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      main: <IndexPage />
    })
  }
})
FlowRouter.route('/add-skill', {
  triggersEnter: [checkLoggedIn],
  action() {
    mount(MainLayout, {
      main: <SkillsInsertPage />
    })
  }
})
const skill = FlowRouter.group({
      prefix: '/s/:skillSlug'
  })
  skill.route('/', {
    action() {
      mount(MainLayout, {
        main: <SkillPage />
      })
    }
  })
  skill.route('/edit', {
    triggersEnter: [checkLoggedIn],
    action() {
      mount(MainLayout, {
        main: <SkillsUpdatePage />
      })
    }
  })
  skill.route('/dev', {
    action() {
      mount(MainLayout, {
        main: <DevPage />
      })
    }
  })
FlowRouter.route('/thread/:threadId', {
  action() {
    mount(MainLayout, {
      main: <ThreadPage />
    })
  }
})
FlowRouter.route('/manifest/:manifestId', {
  action() {
    mount(MainLayout, {
      main: <ManifestPage />
    })
  }
})
FlowRouter.route('/revision/:revisionId', {
  action() {
    mount(MainLayout, {
      main: <RevisionPage />
    })
  }
})
FlowRouter.route('/docs', {
  action() {
    mount(MainLayout, {
      main: <DocsPage />
    })
  }
})
FlowRouter.route('/admin', {
  name: 'admin',
  triggersEnter: [checkAdmin],
  action() {
    mount(MainLayout, {
      main: <AdminPage />
    })
  }
})
FlowRouter.route('/profile', {
  action() {
    mount(MainLayout, {
      main: <ProfilePage />
    })
  }
})
FlowRouter.route('/sign-in', {
  action() {
      FlowRouter.go('/sign-in')
      mount(MainLayout, {
        main: <Blaze template="atForm" />
      })
  }
})
FlowRouter.notFound = {
    action() {
      console.error('Route not found! Redirecting to index page')
      mount(MainLayout, {
          main: <IndexPage />
      })
    }
}

// when user logs out reload page to rerun permission checking
Tracker.autorun(() =>{ if(Session.get('loggedIn')) FlowRouter.reload() })

// this is a must. Otherwise Blaze login templates do not work properly
AccountsTemplates.configureRoute('signIn', {
  action() {
    // TODO: review
    // this is a code dublication (see /sign-in route)
    // change it to FlowRouter.go('/sign-in') ?
    FlowRouter.go('/sign-in')
  }
})


//state='signUp'
/*FlowRouter.route('/private', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action: function() {
    BlazeLayout.render(...);
    // or
    ReactLayout.render(...);
  }
}); */



// routes.jsx

/*AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze-to-react',
  name: 'signin',
  path: '/login',
  template: 'myLogin',
//  layoutTemplate: CustomLayout,
  layoutRegions: {
  },
  contentRegion: 'main'
});*/



/*FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};*/




/*import angular from 'angular'
import router from 'angular-ui-router'

export default angular.module('routes', [
  router
]).config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    'ngInject'
    $locationProvider.html5Mode(true)
    $stateProvider
        .state('index', {
            url: '/',
            template: '<index></index>'
        }).state('add-skill', {
            url: '/add-skill',
            template: '<skill-insert></skill-insert>'/*,
            resolve: {
                currentUser: ($q) => {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED')
                    } else {
                        return $q.resolve()
                    }
                }
            }*/
      /*  }).state('skill-edit', {
            url: '/skill/:skillId/edit',
            template: '<skill-edit></skill-edit>'
        }).state('skill', {
            url:'/skill/:skillId',
            template: '<skill></skill>'
        }).state('revision', {
            url: '/revision/:revisionId',
            template: '<revision></revision>'
        }).state('forum', {
            url: '/skill/:skillId/forum/:forumId',
            template: '<forum></forum>'
        }).state('thread', {
            url: '/thread/:threadId',
            template: '<thread></thread>'
        }).state('manifest', {
            url: '/manifest/:manifestId',
            template: '<manifest></manifest>'
        }).state('docs', {
            url: '/docs',
            template: '<docs></docs>'
        }).state('site-forums', {
            url:'/forums',
            template: '<site-forums></site-forums>'
        }).state('site-threads', {
            url:'/forums/:skillId',
            template: '<site-threads></site-threads>'
        })

    $urlRouterProvider.otherwise("/")
}]).run(['$rootScope', '$state', function($rootScope, $state) {
    'ngInject'
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('signIn')
        }
    })
}])*/
