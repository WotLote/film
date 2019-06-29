import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router'
import s from './index.module.css'

class FindInput extends Component {
	state = {
		input: {
			value: ''
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		e.persist()
		let {input} = this.state
		this.props.history.push(`/find/${input.value}`)
		this.setState({
			input: {
				value: ''
			}
		})
	}
	handleChange = (e) => {
		e.persist()
		this.setState({
			input: {
				value: e.target.value
			}
		})
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit} className={s.mainForm}>
				<input type="text" ref="input" onChange={this.handleChange} value={this.state.input.value} className={s.findInput} placeholder="Поиск"/>
			</form>
		)
	}
}

export default withRouter(FindInput);