const initialState = {
	flag: false,
	obj: ''
};

export default ( state = initialState, action ) => {
	switch (action.type) {
		case 'SET_FIND':
			return {
				...state,
				obj: action.payload.obj,
				flag: action.payload.flag
			};
		default:
			return state;
	}
}