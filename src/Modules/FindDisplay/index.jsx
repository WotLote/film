import React, {Component} from 'react'
import {withRouter} from 'react-router'

import s from './index.module.css'

import FindCard from '../../Components/FindCard'

class Find extends Component {
	displayConstructor = (props = this.props) => {
		let {find} = props.match.params
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${props.config.apiKey}&language=${props.config.language}&query=${find}&page=1&include_adult=false`)
			.then((data) => {
				return data.json()
			})
			.then((res) => {
				this.props.setFind({flag: true, obj: res})
				console.log(res)
			})
	}
	componentDidMount() {
		this.displayConstructor()
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.match.params.find !== nextProps.match.params.find) {
			this.displayConstructor(nextProps)
		}
	}
	render() {
		let {results} = this.props.find.obj
		return (
			<div className={s.main}>
				{!results ? 'Loading...' : results.length ? results.map((res, i) => {
					return (<FindCard key={i} config={this.props.config} {...res} />)
				}) : 'not found'}
			</div>
		)
	}
}

export default withRouter(Find);