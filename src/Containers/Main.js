import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Actions/films';
import Main from '../Modules/Main';


const mapStateProps = ({films}) => ({
	films
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(actions, dispatch)
});


export default connect(mapStateProps, mapDispatchToProps)(Main);
