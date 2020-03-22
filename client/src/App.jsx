import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Paper } from '@material-ui/core'
import PageHeader from './components/PageHeader'
import HomeScreen from './pages/HomeScreen'

const App = () => {
	const [userName, setUserName] = useState(
		localStorage.getItem('userName') || '',
	)

	return (
		<Router>
			<Container>
				<Paper>
					<PageHeader userName={userName} setUserName={setUserName} />
					<Switch>
						<Route path="/" exact>
							<HomeScreen userName={userName} setUserName={setUserName} />
						</Route>
					</Switch>
				</Paper>
			</Container>
		</Router>
	)
}

export default App
