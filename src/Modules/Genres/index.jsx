import React, {Component} from 'react'
import {withRouter} from 'react-router'
import s from './index.module.css'

import ListFilmsGenres from '../../Containers/ListFilmsGenres'

class Genres extends Component {
	componentWillReceiveProps(nextProps) {
	}
	render() {
		return(
			<div className={s.main}>
				<ListFilmsGenres />
			</div>
		)
	}
}

export default withRouter(Genres);