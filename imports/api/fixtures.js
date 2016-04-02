import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Skills } from './skills';

export default ()=>{
  if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  /*  if(Skills.find({userId: 1}).count() >= 0){
      const data = ['First', 'Second', 'Third', 'Fourth']
      data.forEach(function(element, index, array) {
        Skills.insert({
          name: element,
          userId: 1
        })
      });
    }*/
  }
}
