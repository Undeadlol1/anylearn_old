import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import { Threads } from '../../api/threads.js'
import { Manifests } from '../../api/manifests.js'
import template from './forum.html'

class forumCtrl {
    constructor($scope, $state, $stateParams) {
        $scope.viewModel(this)
        this.skillId = $stateParams.skillId
        this.subscribe('skills')
        this.subscribe('revisions')
        this.subscribe('threads', ()=>{
          return [this.skillId]
        })
        this.subscribe('manifests', ()=>{
          return [this.skillId]
        })

        this.helpers({
            skill() {
                return Skills.findOne(this.skillId)
            },
            manifest(){
              return Manifests.findOne()
            },
            threads() {
                return Threads.find({
                    parent: this.skillId
                }, {
                    sort: {
                        createdAt: 1
                    }
                })
            },
            revisions() {
                return Revisions.find({
                    parent: this.skillId
                }, {
                    sort: {
                        createdAt: -1
                    }
                })
            }
        })
    }
}

export default angular.module('forum', [])
  .component('forum', {
    templateUrl: 'imports/pages/forum/forum.html',
    controller: ['$scope', '$state', '$stateParams', forumCtrl]
  })
