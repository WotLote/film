import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as action from '../Actions/find'

import Find from '../Modules/FindDisplay'

const mapStateProps = ({find, config}) => ({
	find,
	config
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(action, dispatch)
})

export default connect(mapStateProps, mapDispatchToProps)(Find)