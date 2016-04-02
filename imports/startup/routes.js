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
        })/*.state('edit-skill', {
            url: '/skill/:skillId/edit',
            templateUrl: 'client/edit-skill/edit-skill.html',
            controller: 'EditSkillCtrl as vm'
        }).state('skill', {
            url: '/skill/:skillId',
            templateUrl: 'client/skill/skill.html',
            controller: 'SkillCtrl as vm'
        }).state('revision', {
            url: '/revision/:revisionId',
            templateUrl: 'client/revision/revision.html',
            controller: 'RevisionCtrl as vm'
        }).state('forum', {
            url: '/skill/:skillId/forum/:forumId',
            templateUrl: 'client/forum/forum.html',
            controller: 'ForumCtrl as vm'
        }).state('thread', {
            url: '/thread/:threadId',
            templateUrl: 'client/thread/thread.html',
            controller: 'ThreadCtrl as vm'
        }).state('history', {
            url: '/history',
            templateUrl: 'client/history/history.html',
            controller: 'HistoryCtrl as history'
        }).state('signIn', {
            url: '/sign-in',
            template: '<sign-in></sign-in>'
        });*/

    $urlRouterProvider.otherwise("/");
}).run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('signIn');
        }
    });
});
