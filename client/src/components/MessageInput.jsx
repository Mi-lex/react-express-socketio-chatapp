import React from 'react'
import PropTypes from 'prop-types'
import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from '@material-ui/core'
import SendContent from '@material-ui/icons/Send'

const MessageInput = ({ sendMessage }) => {
	const messageHandler = (ev) => {
		const message = ev.target.value
		if (message) {
			sendMessage(message)
			ev.target.value = ''
		}
	}

	const onPressEnterHandler = (ev) => {
		if (ev.key === 'Enter') {
			messageHandler(ev)
		}
	}

	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="send-message">Message</InputLabel>
			<Input
				onKeyPress={onPressEnterHandler}
				id="send-message"
				type="text"
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="send a message" onClick={messageHandler}>
							<SendContent />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}

MessageInput.propTypes = {
	sendMessage: PropTypes.func.isRequired,
}

export default MessageInput
