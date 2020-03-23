const getRandomArrayElement = require('../utils').getRandomArrayElement

class ChatRoomController {
	constructor(app) {
		this.app = app

		this.getRandom = this.getRandom.bind(this)
	}

	getRandom(_, res) {
		res.json({ roomId: getRandomArrayElement(this.app.chatRooms) })
	}
}

module.exports = ChatRoomController
