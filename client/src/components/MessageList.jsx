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

const MessageList = ({ messages, refValue }) => {
	const classes = useStyles()

	return (
		<Box className={classes.messagesBlock}>
			<List className={classes.list}>
				{messages.map(({ text, date, user }) => {
					const isMessageMine = user === 'you'

					return (
						<React.Fragment key={date}>
							<ListItem divider>
								<ListItemText
									primary={text}
									secondary={`${date} from ${user}`}
									className={isMessageMine ? classes.myMessage : ''}
								/>
							</ListItem>
						</React.Fragment>
					)
				})}
				<div ref={refValue} />
			</List>
		</Box>
	)
}

MessageList.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string,
			user: PropTypes.string,
			date: PropTypes.string,
		}),
	),
}

MessageList.defaultProps = {
	messages: [],
}

export default MessageList
