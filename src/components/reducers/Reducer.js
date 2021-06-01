export const initialState = {
	loading: true,
	error: '',
	profile: {}
}


export const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
      // console.log(action.payload)
			return {
				loading: false,
				profile: action.payload,
				error: ''
			}
		case 'FETCH_ERROR':
			return {
				loading: false,
				profile:{},
				error: 'Something went wrong!'
			}
		default:
			return state
	}
}