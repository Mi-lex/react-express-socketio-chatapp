const moment = require('moment')

class MessageController {
	constructor(app) {
		this.app = app
	}

	send(socket) {
		return (message) => {
			const { name, room } = this.app.users.find(({ id }) => id === socket.id)

			const chatMessage = this.constructor.createMessage({
				text: message,
				user: name,
			})

			socket.broadcast.to(room).emit('message', chatMessage)

			socket.emit('message', {
				...chatMessage,
				user: 'you',
			})
		}
	}

	static createMessage({ user, text }) {
		return {
			user,
			text,
			date: moment().format('DD.MM HH:mm:ss'),
		}
	}
}

module.exports = MessageController
