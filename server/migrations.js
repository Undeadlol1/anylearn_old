// import helpers from '../imports/helpers';
//
// Migrations.add({
//   version: 1,
//   up() {
// 	  const nodes = Nodes.find({}).fetch()
// 	  nodes.forEach(node => {
// 		  Nodes.update(node._id, {
// 			  $set: helpers.parseUrl(node.url)
// 		  })
// 	  })
//   }
// })
/*Meteor.startup(function() {
  Migrations.migrateTo('latest');
});*/
/*  up() {
    Skills.find({todoCount: {$exists: false}}).forEach(list => {
      const todoCount = Todos.find({listId: list._id}).count();
      Lists.update(list._id, {$set: {todoCount}});
    });
},
  down() {
    Lists.update({}, {$unset: {todoCount: true}});
  }*/
