import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Actions/film';
import Film from '../Modules/Film';


const mapStateProps = ({film, config}) => ({
	film,
	config
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(actions, dispatch)
});


export default connect(mapStateProps, mapDispatchToProps)(Film);
