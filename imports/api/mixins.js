import { Meteor } from 'meteor/meteor'

//const user = Meteor.user()
//const notLoggedError = new Meteor.Error('not-authorized')
export function schemaMixin(methodOptions) {
	console.log(methodOptions)
	methodOptions.validate = methodOptions.schema.validator()
	return methodOptions
}


export function isAdmin() {
	// try {
	// 	if ( user.roles.includes('admin') ) return
	// 	else throw notLoggedError
	// } catch (e) {
	// 	throw notLoggedError
	// }
}
