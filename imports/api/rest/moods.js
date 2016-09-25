import r from 'rethinkdb'
import slugify from 'slug'

export function getMood(id, callback) {
	r.connect(null, function(err, conn) {
		return r.get(id)
		// r.table("employees").eq_join("company_id", r.table("companies")).run()
		return r.table('moods').eq_join("slug", r.table('nodes')).run()
		// r.table('moods').eq_join("slug", run(conn, function(err, cursor) {
		// 	if (err) throw err
		// 	cursor.toArray(function(err, result) {
		// 		if(err) throw err
		// 		const docs =
		// 	})
		// })
	})
}

export function getMoods(callback) {
	r.connect(null, function(err, conn) {
	  if(err) throw err;
	  r.table('moods').run(conn, function(err, cursor) {
	    if (err) throw err;
	    cursor.toArray(function(err, result) {
	        if (err) throw err;
			const docs = JSON.stringify(result, null, 2);
	        return callback(undefined, docs);
	    })
	  })
	})
}

export function insertMood(object) {
	r.connect(null, function(err, conn) {
	  if(err) throw err
	  object.createdAt = Date.now()
	  object.slug = slugify(object.name)
	  r.table('moods').insert(object).run(conn, function(err, result) {
		    if (err) throw err
		    return JSON.stringify(result, null, 2);
		})
  	})
}

// name: {
// 	type: String,
// 	label: 'mood name',
// 	index: true,
// 	unique: true
// },
// slug: {
// 	type: String,
// 	label: 'mood slug',
// 	index: true,
// 	unique: true
// },
// userId: {
// 	type: String,
// 	label: 'mood userId',
// 	regEx: SimpleSchema.RegEx.Id,
// 	autoValue() { if (this.isInsert) return this.userId }
// },
// createdAt: {
// 	label: 'mood createdAt',
// 	type: Date,
// 	autoValue() { if (this.isInsert) return new Date() }
// }
