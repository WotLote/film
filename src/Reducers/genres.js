const initialState = {
	flag: false,
	obj: '',
	id: ''
};

export default ( state = initialState, action ) => {
	switch (action.type) {
		case 'SET_GENRES':
			return {
				...state,
				obj: action.payload.obj,
				flag: action.payload.flag
			};
		case 'SET_GENRESID' :
			return {
				...state,
				id: action.payload
			}
		default:
			return state;
	}
}