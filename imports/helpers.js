function parseYoutube(url) {
	let video_id = url.split('v=')[1],
		ampersandPosition = video_id.indexOf('&')
	if(ampersandPosition != -1) {
		video_id = video_id.substring(0, ampersandPosition)
	}
	return video_id
}

function parseUrl(url) {
	if (url.includes('youtube' || 'youtu.be')) {
		return {
			provider: 'youtube',
			type: 'video',
			content: parseYoutube(url)
		}
	}
	else throw new Meteor.Error("Unrecognised-url-provider")
}

export { parseUrl }
