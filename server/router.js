class Router {
	constructor(app, controllers) {
		this.app = app
		this.controllers = controllers

		this._setup = this._setup.bind(this)
		this._setup()
	}

	_setup() {
		this.app.get('/chatrooms', this.controllers.chatRoom.getRandom)
	}
}

module.exports = Router
