import r from 'rethinkdb'
import slugify from 'slug'

export function insertNode(object) {
	r.connect(null, function(err, conn) {
		if(err) throw err;
		object.createdAt = Date.now()
		object.rating = object.rating ? object.rating : 0
		console.log(object)
		r.table('nodes').insert(object).run(conn, function(err, result) {
			if (err) throw err;
			return JSON.stringify(result, null, 2);
		})
  	})
}

export function getNodes(callback) {
	r.connect(null, function(err, conn) {
		if(err) throw err;
		r.table('nodes').run(conn, function(err, cursor) {
			if (err) throw err;
			cursor.toArray(function(err, result) {
				if (err) throw err;
				const docs = JSON.stringify(result, null, 2);
				return callback(undefined, docs);
			})
		})
	})
}
// content: { // FIXME rename to contentId?
// 	label: 'node content',
// 	type: String,
// 	index: true,
// 	unique: true // ?????
// },
// parent: {
// 	type: String,
// 	label: 'node parent id'
// },
// provider: { // not important ATM (or not? u sure?)
// 	label: 'node provider',
// 	type: String,
// 	optional: true // optional because hard to parse image urls
// },
// type: {
// 	label: 'node type',
// 	type: String
// },
// rating: {
// 	type: Number,
// 	label: 'node rating',
// 	autoValue() { if(this.isInsert) return 0 }
// },
// userId: {
// 	type: String,
// 	label: 'node userId',
// 	regEx: SimpleSchema.RegEx.Id,
// 	autoValue() { if(this.isInsert) return this.userId }
// },
// createdAt: {
// 	label: 'node createdAt',
// 	type: Date,
// 	autoValue() { if(this.isInsert) return new Date() }
// }
