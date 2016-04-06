import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Skills } from '../../api/skills.js';
import { Revisions } from '../../api/revisions.js';
import template from './skill.html';
//import 'meteor/long:htmldiff'
//console.log(htmldiff('<p>this is some text</p>', '<p>this is some more text</p>'))

class skillCtrl {
  constructor($scope, $stateParams, $sce) {
      $scope.viewModel(this);

      this.subscribe('skills');
      this.subscribe('revisions');
      this.helpers({
          skill() {
              return Skills.findOne($stateParams.skillId);
          },
          isSubscribed(){
            if (Meteor.user() && Meteor.user.skills()) return Meteor.user.groups.indexOf($stateParams.skillId)
            return false
          }
          ,
          text(){
            const revision = Revisions.findOne({
              parent: $stateParams.skillId,
              active: true
            })
            if(angular.isDefined(revision) && angular.isDefined(revision.text)){
              revision.text.forEach((item, index, array) => {
                revision.text[index] = $sce.trustAsHtml(revision.text[index])
              })
              return revision.text
            }
            return revision
          }
      })
      this.subscribe = ()=>{
        console.log('Subscribing is happanening!');
      }
  }
}

export default angular.module('skill', [angularMeteor])
  .component('skill', {
    templateUrl: 'imports/pages/skill/skill.html',
    controller: ['$scope', '$stateParams', '$sce', skillCtrl]
  });
