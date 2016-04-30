import angular from 'angular'
import router from 'angular-ui-router'

export default angular.module('routes', [
  router
]).config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
    'ngInject';
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
        }).state('skill-edit', {
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
    'ngInject';
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('signIn')
        }
    })
}])
