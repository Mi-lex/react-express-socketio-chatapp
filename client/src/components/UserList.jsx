import React from 'react'
import PropTypes from 'prop-types'
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'

const UserList = ({ users, userName }) => {
	return (
		<List style={{ marginBottom: 16 }}>
			{users.map(({ id, name }) => {
				const itemName = name === userName ? `${name} (you)` : name

				return (
					<React.Fragment key={id}>
						<ListItem>
							<ListItemIcon style={{ color: '#2ecc71' }}>
								<FaceIcon color="inherit" />
							</ListItemIcon>
							<ListItemText primary={itemName} />
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				)
			})}
		</List>
	)
}

UserList.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		}),
	),
	userName: PropTypes.string.isRequired,
}

UserList.defaultProps = {
	users: [],
}

export default UserList
