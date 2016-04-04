import angular from 'angular';
import 'angular-ui-router'

export default angular.module('routes', [
  'ui.router'
]).config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('index', {
            url: '/',
            template: '<index></index>'/*,
            controller: 'IndexCtrl as vm',
            resolve: {
                currentUser: ($q) => {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }*/
        }).state('add-skill', {
            url: '/add-skill',
            template: '<add-skill></add-skill>'
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
        });

    $urlRouterProvider.otherwise("/");
}).run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('signIn');
        }
    });
});
