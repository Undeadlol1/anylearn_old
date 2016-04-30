import angular from 'angular'
import suggestionsDirective from '../../components/suggestions/suggestions'
import { Meteor } from 'meteor/meteor'
import template from './manifest.html'

class manifestCtrl {
    constructor($scope, $stateParams) {
        $scope.viewModel(this)
        this.manifestId = $stateParams.manifestId
        this.name = ''
        this.text = ''

        this.suggestionsInsert = (name, text) => {
            const data = {
                name,
                text,
                parent: this.manifestId
            }
            Meteor.call('suggestions.insert', data, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    this.name = ''
                    this.text = ''
                    $scope.form.$setPristine()
                    $scope.form.$setUntouched()
                }
            })
        }
    }
}

export default angular.module('manifest', [suggestionsDirective.name])
  .component('manifest', {
    templateUrl: 'imports/pages/manifest/manifest.html',
    controller: ['$scope', '$stateParams', manifestCtrl]
  })
