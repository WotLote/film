import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../Actions/genres';
import ListFilmsGenres from '../Components/ListFilmsGenres';


const mapStateProps = ({genres, config}) => ({
	genres,
	config
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(actions, dispatch)
});


export default connect(mapStateProps, mapDispatchToProps)(ListFilmsGenres);
