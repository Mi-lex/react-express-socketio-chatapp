const ChatRoomController = require('./ChatRoomController')

class Controllers {
	constructor(app) {
		this.chatRoom = new ChatRoomController(app)
	}
}

module.exports = Controllers