const ChatRoomController = require('./ChatRoomController')
const MessageController = require('./MessageController')

class Controllers {
	constructor(app) {
		this.message = new MessageController(app)
		this.chatRoom = new ChatRoomController(app)
	}
}

module.exports = Controllers
