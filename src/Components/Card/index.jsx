import React from 'react'
import s from './index.module.css'
import { withRouter } from "react-router";

const Card = (props) => {
	const {url, title} = props;
	const handleClick = () => {
		props.history.push(`/film/${props.id}`)
	}
	return(
		<div onClick={handleClick} className={s.card}>
			<div className={s.image}><img src={url} alt=""/></div>
			<div className={s.title}>{title}</div>
		</div>
	)
}

export default withRouter(Card);