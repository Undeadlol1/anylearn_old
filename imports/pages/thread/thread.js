import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Comments } from '../../api/comments.js';
import template from './thread.html';

class threadCtrl {
    constructor($scope, $stateParams) {
        $scope.viewModel(this);

        this.subscribe('threads');
        this.subscribe('comments');

        this.helpers({
            comments() {
                return Comments.find({
                    parent: $stateParams.threadId
                }, {
                    sort: {
                        createdAt: 1
                    }
                });
            }
        })

        this.commentsInsert = () => {
            const data = {
                text: this.text,
                parent: $stateParams.threadId
            }
            Meteor.call('comments.insert', data, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    this.text = ' ';
                }
            })
        }
    }
}

export default angular.module('thread', [])
  .component('thread', {
    templateUrl: 'imports/pages/thread/thread.html',
    controller: ['$scope', '$stateParams', threadCtrl]
  });
