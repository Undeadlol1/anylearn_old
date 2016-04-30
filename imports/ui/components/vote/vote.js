import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { Votes } from '../../api/votes'
import template from './vote.html'

class voteCtrl {
    constructor($scope) {
          $scope.viewModel(this)
          this.subscribe('votes',()=>{
            //  return [this.parent]
          })
          this.helpers({
            likes(){
              return Votes.find({
                value: true,
                parent: this.getReactively('this.parent')
              }).count()
            },
            dislikes(){
              return Votes.find({
                value: false,
                parent: this.getReactively('this.parent')
              }).count()
            },
            choice(){
              return Votes.findOne({
                author: Meteor.userId(),
                parent: this.getReactively('this.parent')
              })
            }
          })
          this.vote = value => {
            const data = {value, parent: this.getReactively('this.parent')}
            // if choice exists and choice.value equals to choosen value
            if(this.choice && this.choice.value === data.value) data.value = null
            Meteor.call('votes.choose', data, err=>{
              if (err) console.log(err)
            })
          }
    }
}

export default angular.module('vote', [])
  .component('vote', {
    templateUrl: 'imports/components/vote/vote.html',
    bindings: {
      parent: '<'
    },
    controller: ['$scope', voteCtrl]
  })
