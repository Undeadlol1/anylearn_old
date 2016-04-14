import angular from 'angular'
import { Meteor } from 'meteor/meteor'
import angularMeteor from 'angular-meteor'
import template from './threadsInsert.html'

class threadsInsertCtrl {
    constructor($scope) {
        $scope.viewModel(this)
      //  const parent = this.parent
        this.threadsInsert = (name, text) => {
            const data = { name, text, parent: this.parent }
            Meteor.call('threads.insert', data, (err, result) => {
                if (err) console.log(err)
                else {
                  $scope.$apply(()=>{
                    this.name = null
                    this.text = null
                  })
                }
            })
        }
    }
}

export default angular.module('threadsInsert', [
  angularMeteor
])
  .component('threadsInsert', {
    templateUrl: 'imports/components/threadsInsert/threadsInsert.html',
    bindings: {
      parent: '<'
    },
    controller: ['$scope', threadsInsertCtrl]
  })
