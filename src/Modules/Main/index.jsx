import React, { Component } from 'react'
import s from './Main.module.css'

import ListFilms from '../../Containers/ListFilms'

class Main extends Component {
	render() {
		return(
			<div className={s.main}>
				<ListFilms />
			</div>
		)
	}
}

export default Main;