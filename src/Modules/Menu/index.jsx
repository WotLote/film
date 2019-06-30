import React, { Component } from 'react'
import s from './Menu.module.css'
import {Link} from 'react-router-dom'

import FindInput from '../../Components/FindInput'

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scrollPrev: 0,
			gg: true,
			stubFlag: false
		};
	}
	componentDidMount() {
		fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c3fb3d716ab399aabea859338e9e0e8&language=ru-RU`)
			.then((data) => {
				return data.json()
			})
			.then(({genres}) => {
				this.setState({genres})
				console.log(genres)
			})

		window.addEventListener('scroll', this.handleScroll)
		window.addEventListener('resize', this.handleResize)
		document.addEventListener('click', this.handleClickDocument)
	}
	handleScroll = () => {
		const {Menu} = this.refs;
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if (scrolled < 9) {
			Menu.classList.remove(s.scroll)
			Menu.classList.remove(s.notScroll)
		}
		if(scrolled > Menu.offsetHeight && !this.refs.subUl.clientHeight){
			Menu.classList.remove(s.scroll)
			Menu.classList.add(s.notScroll)
		}
		if (scrolled < this.state.scrollPrev && scrolled > Menu.offsetHeight) {
			Menu.classList.remove(s.notScroll)
			Menu.classList.add(s.scroll)
		}
		this.setState({scrollPrev: scrolled})
	}

	handleResize = () => {
		if (window.innerWidth > 720) {
			this.refs.stubMenu.style.display = 'none'
			this.refs.main.style.display = 'flex'
		} else {
			this.refs.main.style.display = 'none'
			this.refs.stubMenu.style.display = 'flex'
		}
	}
	handleClickDocument = (e) => {
		if (window.innerWidth <= 720) {
			if (e.target.className !== s.stubButton && e.target.parentElement.parentElement.className !== s.findInput && e.target !== this.refs.subLiDiv) {
				let {main, stubMenu} = this.refs
				main.style.display = 'none'
				stubMenu.style.display = 'flex'
			}
		}
	}
	handleClickStubButton = () => {
		let {main, stubMenu} = this.refs
		this.setState({stubFlag: true})
		main.style.display = 'flex'
		stubMenu.style.display = 'none'
	}
	render() {
		return (
			<div ref='TopStub' className={s.topStub}>
				<ul className={s.disp} ref='Menu'>
					<div ref='main' className={s.mainUl}>
						<div>
							<li>
								<Link to='/'>
									<div>
										Фильмы
									</div>
								</Link>
							</li>
							<li>
								<a><div ref='subLiDiv'>Жанры</div></a>
								<ul ref='subUl' className={s.subUl}>
									{this.state.genres ? this.state.genres.map((genres) => {
										let url = `/genres/${genres.id}`
										return (<li key={genres.id}><Link to={url}><div>{genres.name}</div></Link></li>)
									}) : null}
								</ul>
							</li>
						</div>
						<div className={s.findInput}><FindInput /></div>
					</div>
					<div ref='stubMenu' className={s.stubMenu}>
						<div className={s.stubButton} onClick={this.handleClickStubButton}></div>
					</div>
				</ul>
			</div>
		)
	}
}

export default Menu;