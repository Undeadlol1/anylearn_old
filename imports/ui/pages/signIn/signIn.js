import angular from 'angular';
import { Accounts } from 'meteor/accounts-base'
import template from './signIn.html';

class signInCtrl {
  constructor($scope, $state) {
    $scope.viewModel(this);
    Accounts.onLogin(function() {
        $state.go('index');
    });
  }
}

export default angular.module('signIn', [])
  .component('signIn', {
  templateUrl: 'imports/pages/signIn/signIn.html',
  controller: ['$scope', signInCtrl]
});
