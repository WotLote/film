import React , { Component } from 'react';

import {Router, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import Menu from './Modules/Menu'

import Film from './Containers/Film'
import Main from './Containers/Main'
import FindDisplay from './Containers/FindDisplay'
import Genres from './Containers/Genres'



const history = createBrowserHistory();

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router history={history}>
					<Menu />
					<Route exact path="/" component={Main} />
					<Route path="/films/:number" component={Main} />
					<Route path="/film/:id" component={Film} />
					<Route path='/find/:find' component={FindDisplay} />
					<Route path='/genres/:genres/:number' component={Genres} />
				</Router>
			</div>
		);
	}
}

export default App;
