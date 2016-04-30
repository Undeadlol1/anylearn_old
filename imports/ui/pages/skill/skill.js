import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { Skills } from '../../api/skills.js'
import { Revisions } from '../../api/revisions.js'
import template from './skill.html'

class skillCtrl {
  constructor($scope, $stateParams) {
      $scope.viewModel(this)
      const skillId = $stateParams.skillId
      this.subscribe('skills',()=>{
        return [skillId]
      })
      this.subscribe('revisions',()=>{
        return [{
          parent: skillId,
          active: true
        }]
      })
      this.helpers({
        skill() {
            return Skills.findOne()
        },
        revision(){
          return Revisions.findOne()
        },
        isSubscribed (){
          // get user reactively incase login/logout happens
          const user = Meteor.user()
          if (user && user.profile.skills) {
            if(user.profile.skills.indexOf(skillId) != -1) {return true}
          }
        }
      })
      this.subscribe = () => {
        Meteor.call('users.subscribe', skillId)
      }
  }
}

export default angular.module('skill', [angularMeteor])
  .component('skill', {
    templateUrl: 'imports/pages/skill/skill.html',
    controller: ['$scope', '$stateParams', skillCtrl]
  })
