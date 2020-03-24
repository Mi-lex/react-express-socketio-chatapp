import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Typography, Box, TextField } from '@material-ui/core'

const Home = ({ userName, setUserName }) => {
	const location = useLocation()
	const { roomId = '' } = location.state || { roomId: '' }

	const onEnterPressHandler = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault()

			const name = event.target.value

			if (name) {
				name = name.trim().toLowerCase()

				setUserName(name)
				localStorage.setItem('userName', name)
			}
		}
	}

	return (
		<>
			{userName && <Redirect to={`/chatroom/${roomId}`} />}
			<Box height="80vh" pt={4}>
				<Typography variant="h2" align="center">
					Welcome to the chat
				</Typography>
				<Typography variant="h5" align="center">
					Please, enter your name and press Enter
				</Typography>
				<form
					action="/"
					method="post"
					style={{ margin: '10px auto', width: '30%' }}
				>
					<TextField
						color="secondary"
						label="Username"
						type="text"
						name="username"
						fullWidth
						onKeyPress={onEnterPressHandler}
					/>
				</form>
			</Box>
		</>
	)
}

Home.propTypes = {
	userName: PropTypes.string.isRequired,
	setUserName: PropTypes.func.isRequired,
}

export default Home
