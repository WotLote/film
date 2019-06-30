import React, { Component } from 'react'
import s from './index.module.css'

import { withRouter } from "react-router";

import Card from '../Card'

class ListFilmsGenres extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstResults: [],
			results: [],
			url: this.props.config.url + 'w500',
			quantity: 20,
			switch: 1,
			error: false,
			errorMassage: '',
			stub: this.props.config.stub,
			number: 1,
			maxPage: 1000
		};
		this.displayConstructor = this.displayConstructor.bind(this)
	}

	displayConstructor = (page = this.props.match.params.number, props = this.props) => {
		fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.props.config.apiKey}&language=${this.props.config.language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${props.match.params.genres}&page=${page}`)
			.then((data) => {
				return data.json()
			})
			.then((res) => {
				if (res.status_code === 200 || !res.status_code) {
					let {results} = res
					this.setState({firstResults: results, maxPage: res.total_pages > 1000 ? 1000 : res.total_pages})
				} else {
					this.setState({
						error: true,
						errorMassage: res.status_message
					})
				}
			})
			.then(() => {
				let {firstResults} = this.state
				let list = [];
				if (firstResults) {
					for (var i = 0; i < firstResults.length; i++) {
						if (i < this.state.quantity) {
							list[i] = firstResults[i];
						}
					}
				}
				props.setGenres({flag: true, obj: list})
				this.setState({results: []})

			})
			.catch((err) => {
				this.setState({
					error: true,
					errorMassage: err.status_massage
				})
			})
	}
	componentDidMount() {
		let number = this.props.match.params.number ? this.props.match.params.number : 1

		if (this.props.match.params.number > this.state.maxPage){
			this.props.history.push(`/genres/${this.props.match.params.genres}/1`)
			number = this.state.maxPage
		}
		let quantity = this.refs.ListFilmsGenres ? Math.floor(this.refs.ListFilmsGenres.offsetWidth / 312.8) : 5;
		if (quantity === 8) {
			this.setState({quantity: 16})
		} else if (quantity === 3 || quantity === 6) {
			this.setState({quantity: 18})
		} else {
			this.setState({quantity: 20})
		}
		this.displayConstructor(number, this.props)
		this.setState({switch: number})
		this.refs.switch.value = number

		window.addEventListener('resize', this.handleResize)
	}

	handleResize = () => {
		let quantityFilms;
		let quantity;
		if ( window.innerWidth <= 1024 && window.innerWidth >= 879) {
			quantity = this.refs.ListFilmsGenres ? Math.floor(this.refs.ListFilmsGenres.offsetWidth / 432.8) : 5;
		} else {
			quantity = this.refs.ListFilmsGenres ? Math.floor(this.refs.ListFilmsGenres.offsetWidth / 312.8) : 5;
		}
		if (quantity === 8) {
			quantityFilms = 16
		} else if (quantity === 3 || quantity === 6) {
			quantityFilms = 18
		} else {
			quantityFilms = 20
		}
		if (this.state.quantity !== quantityFilms) {
			this.setState({quantity: quantityFilms})
			let {firstResults} = this.state
			let list = [];

			if (firstResults) {
				for (var i = 0; i < firstResults.length; i++) {
					if (i < this.state.quantity) {
						list[i] = firstResults[i];
					}
				}
			}
			this.props.setGenres({flag: true, obj: list})
			this.setState({results: []})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.number !== nextProps.match.params.number || this.props.match.params.genres !== nextProps.match.params.genres) {
			let number = nextProps.match.params.number ? nextProps.match.params.number : 1
			if (nextProps.match.params.number > this.state.maxPage){
				this.props.history.push(`/genres/${nextProps.match.params.genres}/${this.state.maxPage}`)
				number = this.state.maxPage
			}
			let quantity = this.refs.ListFilmsGenres ? Math.floor(this.refs.ListFilmsGenres.offsetWidth / 312.8) : 5;
			if (quantity === 8) {
				this.setState({quantity: 16})
			} else if (quantity === 3 || quantity === 6) {
				this.setState({quantity: 18})
			} else {
				this.setState({quantity: 20})
			}
			this.displayConstructor(number, nextProps)
			this.setState({switch: number})
			this.refs.switch.value = number
		}
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.history.push(`/genres/${this.props.match.params.genres}/${this.refs.switch.value}`)
	}

	handleChange = (e) => {
		e.persist()
		if (e.target.value < 1 || e.target.value > this.state.maxPage) {
			this.refs.switch.value = this.state.switch
		}
	}

	handleClickLeft = () => {
		if (this.refs.switch.value > 1) {
			this.refs.switch.value--
		}
	}
	handleClickRight = () => {
		if (this.refs.switch.value < this.state.maxPage) {
			this.refs.switch.value++
		}
	}
	handleClickTwoLeft = () => {
		if (this.refs.switch.value > 1) {
			this.refs.switch.value = 1
		}
	}
	handleClickTwoRight = () => {
		if (this.refs.switch.value < this.state.maxPage) {
			this.refs.switch.value = this.state.maxPage
		}
	}
	handleClickDay = () => {
		this.displayConstructor('day')
		this.setState({trending: 'день'})
	}
	handleClickWeek = () => {
		this.setState({trending: 'неделю'})
		this.displayConstructor('week')
	}

	render() {
		return(
			<div className={s.genres}>
				{this.state.error ? this.state.errorMassage :
					(<div>
						<div className={s.title}>
							<div>Фильмы</div>
						</div>
						<div className={s.body} ref='ListFilmsGenres'>
							{this.props.genres.flag ? 
								(function(){
									return this.props.genres.obj.map((genre, i) => {
										let url = !genre.poster_path ? this.state.stub : this.state.url + genre.poster_path
										return <Card id={genre.id} url={url} key={i} title={genre.title} />
									})
								}.bind(this))()
							: ('...Loading')}
						</div>
						<div className={s.switch}>
							<div onClick={this.handleClickTwoLeft}></div>
							<div onClick={this.handleClickLeft}></div>
							<div>
								<form action="" onSubmit={this.handleSubmit.bind(this)}>
									<input onChange={this.handleChange} ref='switch' type="number" placeholder='Переключатель'/>
								</form>
							</div>
							<div onClick={this.handleClickRight}></div>
							<div onClick={this.handleClickTwoRight}></div>
						</div>
					</div>)
				}
			</div>

		)
	}
}

export default withRouter(ListFilmsGenres);