import {connect} from 'react-redux'

import {bindActionCreators} from 'redux'
import * as action from '../Actions/genres'


import Genres from '../Modules/Genres'

const mapStateProps = ({genres, config}) => ({
	genres,
	config
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(action, dispatch)
})

export default connect(mapStateProps, mapDispatchToProps)(Genres)