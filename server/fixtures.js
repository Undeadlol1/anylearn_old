import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Forums } from '../imports/api/forums.js'
import { password, email, username } from './PROTECTED_VARIABLES'

if(Meteor.isServer){
Meteor.startup(function () {
  const forumsFind = Forums.find({parent: 'root'})
  if(forumsFind.count() === 0){
    console.log('There are no forums')
    console.log('Inserting forums...')
    function insert(name, description){
      return Forums.insert({
        name,
        description,
        parent: 'root',
        createdAt: new Date()
      },function(err, result){
        if(err) console.log(err)
      })
    }
    insert('О сайте', 'Предложения, баг-репорты и прочее')
  }
const findAdmin = new Promise(function(resolve, reject) {
  //const query = Meteor.users.findOne({emails: {$elemMatch: {adress: 'undeadlol1@mail.ru'}}})
  //console.log( Meteor.users.findOne({'emails.adress': 'undeadlol1@mail.ru'}) );
  const query = Accounts.findUserByEmail(email)
  //console.log(Meteor.users.findOne({emails: {$elemMatch: {adress: 'undeadlol1@mail.ru'}}}).fetch());
  if( query ){
    resolve( query )
  } else if ( query === undefined ){
    resolve( undefined )
  } else {
    reject()
  }
})
findAdmin.then(val=>{
    if (val === undefined && password != undefined) {
      console.log('Admin not found!'+'\nCreating admin...')
      const profile = {isAdmin: true}
      const data = { username, email, password, profile }
      Accounts.createUser(data)
      console.log('Admin user created!')
    } else if (password == undefined){
      console.log('Password is not specified. Did you create PROTECTED_VARIABLES.js file?')
    }
})

//console.log(Meteor.users().find())
/*const users = new Promise(function(resolve, reject) {
  if(Meteor.users.findOne() != undefined){
    console.log('if (Meteor.users())')
    resolve(Meteor.users.find().fetch())
  } else {
    console.log('else')
    reject(new Error('promise is rejected'))
  }
})
users.then(val=>{
  //console.log(val)
})*/
/*console.log('trying to find user')
const admin = Meteor.users.findOne({
  emails: {$elemMatch: {adress: 'undeadlol1@mail.ru'}}
})
const admin = Meteor.users.findOne({'emails.adress': 'undeadlol1@mail.ru'})
console.log(admin)
if (admin === undefined && password != undefined) {
  console.log('Admin not found!')
 console.log('Inserting admin')
  const data = {
  username: 'undeadlol1',
  email: 'undeadlol1@mail.ru',
  password: password
  }
 Accounts.createUser(data)
  Accounts.onCreateUser(function(options, user) {
    if (options.email === 'undeadlol1@mail.ru') user.isAdmin = true
    return user
  })
  console.log('User admin inserted normally')
}*/
})
}
