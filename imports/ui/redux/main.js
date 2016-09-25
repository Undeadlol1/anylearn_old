import { $ } from 'meteor/jquery';

export const initialState =	{
								mood: {},
								node: {},
								moods: []
							}


export const rootReducer = function(state, action) {
	if(state === undefined) return initialState

	let newState = state

	switch(action.type) {
		case 'fetch_moods':
			// $.get( `api/moods`, data => {
			// 	console.log('data', data)
			// 	const moods = JSON.parse(data);
			// 	newState = Object.assign({}, state, {moods})
			// 	console.log('newState', newState)
			// })
			break
		case 'get_content':
			newState = Object.assign({}, state, {data: action.data})
			break
	}
	console.log('newstate is about to come through')
	return newState
}
