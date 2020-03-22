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

const UserList = ({ users }) => {
	return (
		<List style={{ marginBottom: 16 }}>
			{users.map(({ id, name }) => (
				<React.Fragment key={id}>
					<ListItem>
						<ListItemIcon>
							<FaceIcon />
						</ListItemIcon>
						<ListItemText primary={name} />
					</ListItem>
					<Divider variant="inset" component="li" />
				</React.Fragment>
			))}
		</List>
	)
}

UserList.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		}),
	),
}

UserList.defaultProps = {
	users: [],
}

export default UserList
