import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'
//import AccountsTemplates from 'meteor/useraccounts:core'
//import { Accounts } from 'meteor/accounts-base'


import AccountsUIWrapper from '../ui/containers/AccountsUIWrapper'
import MainLayout from '../ui/pages/layouts/MainLayout.js'
import IndexPage from '../ui/pages/IndexPage'
import SkillPage from '../ui/pages/SkillPage'
import SkillsInsertPage from '../ui/pages/SkillsInsertPage'
import SkillsUpdatePage from '../ui/pages/SkillsUpdatePage'

//Routes
/*Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});*/

FlowRouter.route('/', {
//  name: 'index',
  action() {
    mount(MainLayout, {
      main: <IndexPage />
    })
  }
})
FlowRouter.route('/add-skill', {
  action() {
    mount(MainLayout, {
      main: <SkillsInsertPage />
    })
  }
})
FlowRouter.route('/skill/:skillId', {
  action() {
    mount(MainLayout, {
      main: <SkillPage />
    })
  }
})
FlowRouter.route('/skill/:skillId/edit', {
  action() {
    mount(MainLayout, {
      main: <SkillsUpdatePage />
    })
  }
})
FlowRouter.route('/sign-in', {
//  name: 'signIn',
  action() {
    mount(MainLayout, {
      main: <AccountsUIWrapper />
    })
  }
})
FlowRouter.notFound = {
    action: function() {
      mount(MainLayout, {
          main: <IndexPage />
      })
    }
}

// this is a must
AccountsTemplates.configureRoute('signIn', {
  action() {
    mount(MainLayout, {
      main: <AccountsUIWrapper />
    })
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
