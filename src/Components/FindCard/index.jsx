import React, {Component} from 'react'
import {withRouter} from 'react-router'

import s from './index.module.css'

class FindCard extends Component {
	componentDidMount() {
		console.log(this.props)
		let url = this.props.poster_path ? `${this.props.config.url}w500${this.props.poster_path}` : this.props.config.stub
		console.log(url)
	}
	handleClick = () => {
		this.props.history.push(`/film/${this.props.id}`)
	}
	render() {
		let url = this.props.poster_path ? `${this.props.config.url}w500${this.props.poster_path}` : this.props.config.stub
		return(
			<div className={s.main} onClick={this.handleClick}>
				<div className={s.image}>
					<img src={url} alt={this.props.title}/>
				</div>
				<div className={s.description}>
					<div className={s.title}>
						<div>{this.props.title}</div>
						<div>{this.props.original_title}</div>
					</div>
					<div className={s.overview}>
						{this.props.overview}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(FindCard);