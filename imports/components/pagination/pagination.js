import angular from 'angular';
import angularMeteor from 'angular-meteor'
import template from './pagination.html'

class paginationCtrl {
    constructor($scope) {
      $scope.viewModel(this)
      // do i even need this watcher?
        $scope.$watch('pages',(oldValue, newValue)=>{
        //  console.log(oldValue);
        //  console.log(newValue);
          if (newValue){
        //  console.log(newValue);
        //  this.pages = newValue
      }}
    )
    //  console.log(this.pages);
    }
}

export default angular.module('pagination', [angularMeteor])
  .component('pagination', {
    templateUrl: 'imports/components/pagination/pagination.html',
    bindings: {
      pages: '<',
      onChangePage: '&'
    },
    controller: ['$scope', paginationCtrl]
  });
