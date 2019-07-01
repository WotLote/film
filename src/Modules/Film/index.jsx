import React, {Component} from 'react'
import s from './index.module.css'
import {withRouter} from 'react-router'

import Description from '../../Containers/Description'

class Film extends Component {
	render() {
		return (
			<div className={s.main}>
				<Description />
				<div className={s.field}>
					<div className={s.videoField}>
						<iframe src="http://moonwalk.cc/serial/dd611e4a0d3dcd1a42ce2277389fae32/iframe?season=01&episode=02" width="610" height="370" frameborder="0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Film)