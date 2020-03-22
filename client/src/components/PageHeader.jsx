import React from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	}),
)

const PageHeader = ({ userName, setUserName }) => {
	const classes = useStyles()

	const resetUserName = () => {
		localStorage.setItem('userName', '')
		setUserName('')
	}

	return (
		<div className={classes.root}>
			<AppBar position="static" color="secondary">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						ChatApp
					</Typography>
					{userName && (
						<Button color="inherit" onClick={resetUserName}>
							Reset name
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}

PageHeader.propTypes = {
	userName: PropTypes.string.isRequired,
	setUserName: PropTypes.func.isRequired,
}

export default PageHeader
