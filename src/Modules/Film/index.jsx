import React, {Component} from 'react'
import s from './index.module.css'
import {withRouter} from 'react-router'

import Description from '../../Containers/Description'

class Film extends Component {
	render() {
		return (
			<div className={s.main}>
				<Description />
			</div>
		)
	}
}

export default withRouter(Film)