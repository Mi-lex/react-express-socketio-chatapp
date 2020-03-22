import React from 'react'
import PropTypes from 'prop-types'
import { Box, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	messagesBlock: {
		height: '70vh',
		overflowY: 'scroll',
	},
	myMessage: {
		textAlign: 'right',
	},
}))

const MessageList = ({ messages, userName }) => {
	const classes = useStyles()

	return (
		<Box className={classes.messagesBlock}>
			<List className={classes.list}>
				{messages.map(({ id, text, date, from }) => {
					const isMessageMine = from === userName

					return (
						<React.Fragment key={id}>
							<ListItem divider>
								<ListItemText
									primary={text}
									secondary={`${date} from ${isMessageMine ? 'you' : from}`}
									className={isMessageMine ? classes.myMessage : ''}
								/>
							</ListItem>
						</React.Fragment>
					)
				})}
			</List>
		</Box>
	)
}

MessageList.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			text: PropTypes.string,
			from: PropTypes.string,
			date: PropTypes.string,
		}),
	),
	userName: PropTypes.string.isRequired,
}

MessageList.defaultProps = {
	messages: [],
}

export default MessageList
