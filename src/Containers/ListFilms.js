import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Actions/films';
import ListFilms from '../Components/ListFilms';


const mapStateProps = ({films, config}) => ({
	films,
	config
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(actions, dispatch)
});


export default connect(mapStateProps, mapDispatchToProps)(ListFilms);
