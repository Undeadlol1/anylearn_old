import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import { Skills } from '../../api/skills.js';
import { Revisions } from '../../api/revisions.js';
import { Threads } from '../../api/threads.js';
import template from './forum.html';

class forumCtrl {
    constructor($scope, $state, $stateParams) {
        $scope.viewModel(this);

        this.subscribe('skills');
        this.subscribe('revisions');
        this.subscribe('threads');

        this.helpers({
            skill() {
                return Skills.findOne($stateParams.skillId);
            },
            threads() {
                return Threads.find({
                    parent: $stateParams.skillId
                }, {
                    sort: {
                        createdAt: 1
                    }
                });
            },
            revisions() {
                return Revisions.find({
                    parent: $stateParams.skillId
                }, {
                    sort: {
                        createdAt: -1
                    }
                })
            }
        })

        this.threadsInsert = () => {
            const data = {
                name: this.name,
                text: this.text,
                parent: $stateParams.skillId
            }
            Meteor.call('threads.insert', data, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    this.name = '';
                    this.text = '';
                }
            })
        }
    }
}

export default angular.module('forum', [])
  .component('forum', {
    templateUrl: 'imports/pages/forum/forum.html',
    controller: ['$scope', '$state', '$stateParams', forumCtrl]
  });
