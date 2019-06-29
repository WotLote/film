import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Actions/description';
import Description from '../Components/Description';


const mapStateProps = ({description, config}) => ({
	description,
	config
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(actions, dispatch)
});


export default connect(mapStateProps, mapDispatchToProps)(Description);
