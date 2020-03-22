import React from 'react'
import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from '@material-ui/core'
import SendContent from '@material-ui/icons/Send'

const MessageInput = () => {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="send-message">Message</InputLabel>
			<Input
				id="send-message"
				type="text"
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="send a message">
							<SendContent />
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}

export default MessageInput
