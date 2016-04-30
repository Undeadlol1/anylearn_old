import angular from 'angular';
import { Meteor } from 'meteor/meteor'
import angularMeteor from 'angular-meteor';
import { Threads } from '../../api/threads.js';
import { Comments } from '../../api/comments.js';
import template from './thread.html';

class threadCtrl {
    constructor($scope, $stateParams) {
        $scope.viewModel(this);
        const parent = $stateParams.threadId
        this.subscribe('threads');
        this.subscribe('comments', ()=>{
          return [parent]
        });

        this.helpers({
            thread(){
              return Threads.findOne(parent, {fields:{
                name: 1
              }})
            },
            comments() {
            return Comments.find({ //const comments =
                  parent
              }, {
                  sort: {
                      createdAt: 1
                  }
              }).map(function(doc) {
                const user = Meteor.users.findOne(doc.author)
                doc.username = user.username || user.email
                return doc
              })
              //if (comments) return comments
              //return ''
            }
        })

        this.commentsInsert = () => {
            const data = {
                parent,
                text: this.text
            }
            Meteor.call('comments.insert', data, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    this.text = '';
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
