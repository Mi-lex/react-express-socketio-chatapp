const ChatServer = require('./chat-server')
const Controllers = require('./controllers')
const Router = require('./router')

const app = new ChatServer().getApp()
const controllers = new Controllers(app)
const router = new Router(app, controllers)
router.setup()
