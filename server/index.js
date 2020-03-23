const http = require('http')
const express = require('express')
const cors = require('cors')
const AppRouter = require('./router')
const Controllers = require('./controllers')
const socketio = require('socket.io')
const generateId = require('./utils').generateId

const PORT = 3010
const CHAT_ROOM_AMOUNT = 3

const app = express()
const server = http.createServer(app)
app.server = server
app.io = socketio(server)

app.use(cors())

const controllers = new Controllers(app)
app.routers = new AppRouter(app, controllers)

app.chatRooms = Array(CHAT_ROOM_AMOUNT)
	.fill(null)
	.map((_) => generateId())

app.server.listen(process.env.PORT || PORT, () => {
	console.log(`App is running on port ${app.server.address().port}`)
})
