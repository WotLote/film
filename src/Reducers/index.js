import { combineReducers } from 'redux';
import films from './films';
import film from './film'
import config from './config'
import description from './description'


export default combineReducers({
	films,
	film,
	config,
	description
})