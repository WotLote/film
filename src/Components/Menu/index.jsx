import React, { Component } from 'react'
import s from './Menu.module.css'
import {Link} from 'react-router-dom'

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
		if(scrolled > Menu.offsetHeight){
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
		if (window.innerWidth > 640) {
			this.refs.stubMenu.style.display = 'none'
			this.refs.main.style.display = 'flex'
		} else {
			this.refs.main.style.display = 'none'
			this.refs.stubMenu.style.display = 'flex'
		}
	}
	handleClickDocument = (e) => {
		if (window.innerWidth <= 640) {
			if (e.target.className !== s.stubButton) {
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
						<li>
							<Link to='/'>
								<div>
									Фильмы
								</div>
							</Link>
						</li>
						<li>
							<a><div>Справочники</div></a>
							<ul className={s.subUl}>
								<li><Link to='/app/tovars'><div>Товары</div></Link></li>
								<li><Link to='/app/manufacturers'><div>Производители</div></Link></li>
								<li><Link to='/app/type'><div>Категории</div></Link></li>
								<li><Link to='/app/providers'><div>Поставщики</div></Link></li>
								<li><Link to='/app/people'><div>Ответственные лица</div></Link></li>
							</ul>
						</li>
						<li>
							<Link to='/app/storage'>
								<div>
									Склад
								</div>
							</Link>
						</li>
						<li>
							<a><div>Статистика</div></a>
							<ul className={s.subUl}>
								<li><Link to='/app/statistics/arrival'><div>Статистика прихода</div></Link></li>
								<li><Link to='/app/statistics/real'><div>Статистика расхода</div></Link></li>
								<li><Link to='/app/statistics'><div>Статистика за период</div></Link></li>
							</ul>
						</li>
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