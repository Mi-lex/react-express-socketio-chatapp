import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
	const classes = useStyles()
	const { chatRoomId } = useParams()

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
