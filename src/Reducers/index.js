import { combineReducers } from 'redux';
import films from './films';
import film from './film'
import config from './config'
import description from './description'
import find from './find'
import genres from './genres'


export default combineReducers({
	films,
	film,
	config,
	description,
	find,
	genres
})