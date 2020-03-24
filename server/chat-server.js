const createServer = require('http').createServer
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const generateId = require('./utils').generateId

class ChatServer {
	static PORT = 3010
	static CHAT_ROOM_AMOUNT = 3

	constructor() {
		this._createApp()
		this._config()
		this._createServer()
		this._listen()
	}

	_createApp() {
		this.app = express()
	}

	_config() {
		this.port = process.env.PORT || ChatServer.PORT

		this.app.chatRooms = Array(ChatServer.CHAT_ROOM_AMOUNT)
			.fill(null)
			.map((_) => generateId())
		this.app.users = []
	}

	_createServer() {
		this.server = createServer(this.app)
		this.app.io = socketio(this.server)
		this.app.use(cors())
	}

	_listen() {
		this.server.listen(this.port, () => {
			console.log(`App is running on port ${this.server.address().port}`)
		})
	}

	getApp() {
		return this.app
	}
}

module.exports = ChatServer
