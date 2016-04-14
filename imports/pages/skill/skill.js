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
      this.subscribe('skills')
      this.subscribe('revisions')
      this.helpers({
          skill() {
              return Skills.findOne(skillId)
          },
          text(){
            const revision = Revisions.findOne({
              parent: skillId,
              active: true
            })
            if(angular.isDefined(revision) && angular.isDefined(revision.text)){
              return revision.text
            }
            return revision
          },
          user(){
            if(!Meteor.user()) return undefined
            return Meteor.user()
          },
          isSubscribed (){
            // get user reactively incase login/logout happanes
            const user = this.getReactively('user')
            if (angular.isDefined(user) && angular.isDefined(user.profile) &&
             angular.isDefined(user.profile.skills)) {
              // check if user has item in inside profile.skills array
              const indexOf = user.profile.skills.indexOf(skillId)
              if(indexOf === -1) { return false} else { return true}
            }
            return false
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
