import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Paper } from '@material-ui/core'
import PageHeader from './components/PageHeader'
import HomeScreen from './pages/HomeScreen'
import ChatRoom from './pages/ChatRoom'

const App = () => {
	const [userName, setUserName] = useState(
		localStorage.getItem('userName') || '',
	)

	const changeUsername = (name) => {
		setUserName(name)
		localStorage.setItem('userName', name)
	}

	return (
		<Router>
			<Container>
				<Paper>
					<PageHeader userName={userName} setUserName={changeUsername} />
					<Switch>
						<Route path="/" exact>
							<HomeScreen userName={userName} setUserName={changeUsername} />
						</Route>
						<Route path="/chatroom/:chatRoomId?">
							<ChatRoom userName={userName} />
						</Route>
					</Switch>
				</Paper>
			</Container>
		</Router>
	)
}

export default App
