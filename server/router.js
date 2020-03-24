class Router {
	constructor(app, controllers) {
		this.app = app
		this.controllers = this.app.controllers

		this._setup = this._setup.bind(this)
		this._setup()
	}

	_setup() {
		this.app.get('/chatrooms/random', this.controllers.chatRoom.getRandom)

		this.app.io.on('connect', (socket) => {
			socket.on('join', this.controllers.chatRoom.join(socket))

			socket.on('chat message', this.controllers.message.send(socket))

			socket.on('disconnect', this.controllers.chatRoom.disconnect(socket))
		})
	}
}

module.exports = Router
