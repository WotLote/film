import React, { Component } from 'react'

export default class Film extends Component {
	componentDidMount() {
		console.log(this.props)
		fetch('https://api.themoviedb.org/3/search/multi?api_key=7c3fb3d716ab399aabea859338e9e0e8&language=ru&query=%D0%B8%D0%B3%D1%80%D0%B0%20%D0%BF%D1%80%D0%B5%D1%81%D1%82%D0%BE%D0%BB%D0%BE%D0%B2&page=1&include_adult=false')
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				console.log(res)
			})
	}
	render() {
		return (
			<div>
				<div className="gg">
					<div id="yohoho" data-title="John Wick"></div> 
				</div>
				<button>kjq</button>
			</div>
		)
	}
}

/*'https://api.themoviedb.org/3/search/multi?api_key=7c3fb3d716ab399aabea859338e9e0e8&language=ru&query=----'*/