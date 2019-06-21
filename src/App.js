import React , { Component } from 'react';
import Film from './Components/Film'

import {Router, Route, Link} from 'react-router-dom'
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flag: 0,
		};
	}
	handleClick = () => {
		this.setState({flag: 1})
	}
	render() {
		return (
			<div className="App">
				<Router history={history}>
					<Link to='/film'>kxjxk</Link>
					<Route render={ () => <Film />} exact path='/film'/>
				</Router>
			</div>
		);
	}
}

export default App;
