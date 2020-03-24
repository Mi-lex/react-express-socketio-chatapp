const getRandomArrayElement = require('../utils').getRandomArrayElement
const createMessage = require('./MessageController').createMessage

class ChatRoomController {
	constructor(app) {
		this.app = app
		this.getRandom = this.getRandom.bind(this)
	}

	getRandom(_, res) {
		res.json({ roomId: getRandomArrayElement(this.app.chatRooms) })
	}

	join(socket) {
		return ({ name, room }) => {
			const { error, user } = this.addUser({ id: socket.id, name, room })

			if (error) {
				socket.emit('err', error)
				return
			}

			socket.join(user.room)

			socket.emit(
				'message',
				createMessage({
					user: 'admin',
					text: `${user.name}, welcome to room ${user.room}.`,
				}),
			)

			socket.broadcast.to(user.room).emit(
				'message',
				createMessage({
					user: 'admin',
					text: `${user.name} has joined!`,
				}),
			)

			this.app.io.to(user.room).emit('roomData', {
				users: this.getUsersInRoom(user.room),
			})
		}
	}

	disconnect(socket) {
		return () => {
			const user = this.removeUser(socket.id)

			if (user) {
				this.app.io.to(user.room).emit(
					'message',
					createMessage({
						user: 'Admin',
						text: `${user.name} has left.`,
					}),
				)
				this.app.io.to(user.room).emit('roomData', {
					room: user.room,
					users: this.getUsersInRoom(user.room),
				})
			}
		}
	}

	addUser({ id, name, room }) {
		if (!name || !room) return { error: 'Username and room are required.' }

		name = name.trim().toLowerCase()
		room = room.trim().toLowerCase()

		const roomExist = this.app.chatRooms.includes(room)

		if (!roomExist)
			return { error: `Room: ${room} does not exist on the server` }

		const existingUser = this.app.users.find(
			(user) => user.room === room && user.name === name,
		)

		if (existingUser)
			return { error: `Username: ${existingUser.name} is taken in that room.` }

		const user = { id, name, room }

		this.app.users.push(user)

		return { user }
	}

	removeUser(id) {
		const index = this.app.users.findIndex((user) => user.id === id)

		return ~index ? this.app.users.splice(index, 1)[0] : null
	}

	getUsersInRoom(room) {
		return this.app.users.filter((user) => user.room === room)
	}
}

module.exports = ChatRoomController
