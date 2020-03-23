import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../services'
import { Redirect, useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MessageList from '../components/MessageList'
import UserList from '../components/UserList'
import MessageInput from '../components/MessageInput'

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
}))

const ChatRoom = ({ userName }) => {
	const [users, setUsers] = useState([])
	const [messages, setMessages] = useState([])
	const [generatedRoomId, setGeneratedRoomId] = useState('')
	const { chatRoomId } = useParams()
	const classes = useStyles()

	useEffect(() => {
		if (!chatRoomId) {
			api
				.get('chatrooms/random')
				.then((response) => {
					const { roomId } = response.data
					setGeneratedRoomId(roomId)
				})
				.catch(alert)
		}
	}, [chatRoomId])

	return (
		<>
			{!userName && (
				<Redirect
					to={{
						pathname: '/',
						state: { chatRoomId },
					}}
				/>
			)}
			{generatedRoomId && <Redirect to={`/chatroom/${generatedRoomId}`} />}

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
