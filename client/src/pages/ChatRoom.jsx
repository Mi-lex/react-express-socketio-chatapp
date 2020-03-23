import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api, { baseUrl } from '../services'
import { Redirect, useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MessageList from '../components/MessageList'
import UserList from '../components/UserList'
import MessageInput from '../components/MessageInput'
import io from 'socket.io-client'

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
}))

const ChatRoom = ({ userName }) => {
	const { chatRoomId: paramRoomId } = useParams()
	const [roomId, setRoomId] = useState(paramRoomId)
	const [users, setUsers] = useState([])
	const [messages, setMessages] = useState([])

	const socket = io(baseUrl)

	const classes = useStyles()

	useEffect(() => {
		// if room is not specified in url, get random room
		if (!roomId) {
			api
				.get('chatrooms/random')
				.then((response) => {
					const { roomId } = response.data
					setRoomId(roomId)
				})
				.catch(alert)
		} else if (roomId && userName) {
			socket.emit('join', { name: userName, room: roomId }, (error) => {
				if (error) {
					alert(error)
				}
			})

			// subscriptions
			socket.on('message', (message) => {
				setMessages((messages) => [...messages, message])
			})

			socket.on('roomData', ({ users }) => {
				setUsers(users)
			})
		}

		return () => {
			if (socket) {
				socket.close()
			}
		}
	}, [roomId, userName])

	return (
		<>
			{!userName && (
				<Redirect
					to={{
						pathname: '/',
						state: { roomId },
					}}
				/>
			)}
			{userName && roomId && <Redirect to={`/chatroom/${roomId}`} />}

			<Box display="flex" justifyContent="space-between" pb={3}>
				<Box width="25%">
					<Typography variant="h5" gutterBottom className={classes.text}>
						Users
					</Typography>
					<UserList users={users} />
				</Box>
				<Box width="70%">
					<Typography variant="h5" gutterBottom className={classes.text}>
						Messages
					</Typography>
					<MessageList messages={messages} userName={userName} />
					<MessageInput />
				</Box>
			</Box>
		</>
	)
}

ChatRoom.propTypes = {
	userName: PropTypes.string.isRequired,
}

export default ChatRoom
