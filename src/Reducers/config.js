const initialState = {
	stub: 'https://static.wixstatic.com/media/2bb18c_55eea8db5467426c8c2593b346f5f545~mv2.gif',
	url: 'https://image.tmdb.org/t/p/',
	apiKey: '7c3fb3d716ab399aabea859338e9e0e8',
	language: 'ru-RU'
};

export default ( state = initialState, action ) => {
	switch (action.type) {
		case 'SET_CONFIG':
			return {
				...state,
				stub: action.payload.stub,
				url: action.payload.url,
				apiKey: action.payload.apiKey,
				language: action.payload.language
			};
		default:
			return state;
	}
}