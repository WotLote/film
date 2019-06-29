import React, {Component, Fragment} from 'react'
import s from './index.module.css'
import {withRouter} from 'react-router'

class DescriptionFilm extends Component {
	componentDidMount() {
		console.log(this.props)
		fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=7c3fb3d716ab399aabea859338e9e0e8&language=ru-RU`)
			.then((data) => {
				return data.json();
			})
			.then((res) => {
				console.log(res)
				this.props.setDescription({flag: true, obj: res})
			})
	}
	render() {
		let { flag, obj } = this.props.description;
		let url = !obj.poster_path ? this.props.config.stub : this.props.config.url + 'w500' + obj.poster_path
		return (
			<div className={s.main}>
				{flag ? 
					<Fragment>
						<div className={s.topDescription}>
							<div className={s.image}>
								<img src={url} alt='hh'/>
							</div>
							<div className={s.body}>
								<div className={s.title}>
									<div>{obj.title}</div>
									<div>{obj.original_title}</div>
								</div>
								<div className={s.year}>
									<div>
										<div></div>
										<div>Дата: </div>
									</div>
									<div>{obj.release_date}</div>
								</div>
								<div className={s.countries}>
									<div>
										<div></div>
										<div>{obj.production_countries.length > 1 ? 'Страны: ' : 'Страна: '}</div>
									</div>
									<div>
										{obj.production_countries.map((country, i) => {
											return <div key={i}>{country.name}</div>
										})}
									</div>
								</div>
								<div className={s.genres}>
									<div>
										<div></div>
										<div>{obj.genres.length > 1 ? 'Жанры: ' : 'Жанр: '}</div>
									</div>
									<div>
										{obj.genres.map((genre, i) => {
											return <div key={i}>{genre.name}</div>
										})}
									</div>
								</div>
							</div>
						</div>
						<div className={s.overview}>
							<div>{obj.overview}</div>
						</div>
					</Fragment>
				: 'Loading...'}
			</div>
		)
	}
}

export default withRouter(DescriptionFilm)
