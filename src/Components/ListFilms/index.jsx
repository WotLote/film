import React, { Component } from 'react'
import s from './index.module.css'

import { withRouter } from "react-router";

import Card from '../Card'

class ListFilms extends Component {
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
			trending: 'день'
		};
		this.displayConstructor = this.displayConstructor.bind(this)
	}

	displayConstructor = (trending, page = this.props.match.params.number, props = this.props) => {
		if (!page) {
			page = 1;
		}
		fetch(`https://api.themoviedb.org/3/trending/movie/${trending}?api_key=${this.props.config.apiKey}&language=${this.props.config.language}&page=${page}`)
			.then((data) => {
				return data.json()
			})
			.then((res) => {
				if (res.status_code === 200 || !res.status_code) {
					let {results} = res
					this.setState({firstResults: results})
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
				props.setFilms({flag: true, obj: list})
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

		if (this.props.match.params.number > 1000){
			this.props.history.push(`/films/1000`)
			number = 1000
		}
		let quantity = this.refs.ListFilms ? Math.floor(this.refs.ListFilms.offsetWidth / 312.8) : 5;
		if (quantity === 8) {
			this.setState({quantity: 16})
		} else if (quantity === 3 || quantity === 6) {
			this.setState({quantity: 18})
		} else {
			this.setState({quantity: 20})
		}
		this.displayConstructor('day', number, this.props)
		this.setState({switch: number})
		this.refs.switch.value = number

		window.addEventListener('resize', this.handleResize)
	}

	handleResize = () => {
		let quantityFilms;
		let quantity;
		if ( window.innerWidth <= 1024 && window.innerWidth >= 879) {
			quantity = this.refs.ListFilms ? Math.floor(this.refs.ListFilms.offsetWidth / 432.8) : 5;
		} else {
			quantity = this.refs.ListFilms ? Math.floor(this.refs.ListFilms.offsetWidth / 312.8) : 5;
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
			this.props.setFilms({flag: true, obj: list})
			this.setState({results: []})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.number !== nextProps.match.params.number) {
			let number = nextProps.match.params.number ? nextProps.match.params.number : 1
			if (nextProps.match.params.number > 1000){
				this.props.history.push(`/films/1000`)
				number = 1000
			}
			let quantity = this.refs.ListFilms ? Math.floor(this.refs.ListFilms.offsetWidth / 312.8) : 5;
			if (quantity === 8) {
				this.setState({quantity: 16})
			} else if (quantity === 3 || quantity === 6) {
				this.setState({quantity: 18})
			} else {
				this.setState({quantity: 20})
			}
			this.displayConstructor('day', number, nextProps)
			this.setState({switch: number})
			this.refs.switch.value = number
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.history.push(`/films/${this.refs.switch.value}`)
		this.props.location.pathname = `/films/${this.refs.switch.value}`
	}

	handleChange = (e) => {
		e.persist()
		if (e.target.value < 1 || e.target.value > 1000) {
			this.refs.switch.value = this.state.switch
		}
	}

	handleClickLeft = () => {
		if (this.refs.switch.value > 1) {
			this.refs.switch.value--
		}
	}
	handleClickRight = () => {
		if (this.refs.switch.value < 1000) {
			this.refs.switch.value++
		}
	}
	handleClickTwoLeft = () => {
		if (this.refs.switch.value > 1) {
			this.refs.switch.value = 1
		}
	}
	handleClickTwoRight = () => {
		if (this.refs.switch.value < 1000) {
			this.refs.switch.value = 1000
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
			<div className={s.films}>
				{this.state.error ? this.state.errorMassage :
					(<div>
						<div className={s.title}>
							<button onClick={this.handleClickDay}>За день</button>
							<div>Лучшее за {this.state.trending}</div>
							<button onClick={this.handleClickWeek}>За неделю</button>
						</div>
						<div className={s.body} ref='ListFilms'>
							{this.props.films.flag ? 
								(function(){
									return this.props.films.obj.map((film, i) => {
										let url = !film.poster_path ? this.state.stub : this.state.url + film.poster_path
										return <Card id={film.id} url={url} key={i} title={film.title} />
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

export default withRouter(ListFilms);