import { constants } from '../constants/index';

const initialState = {
	product: null,
	products:null,
	shipping: null,
	error: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case constants.GET_PRODUCTS_SUCCESS:
			return{
				...state,
				products: action.data,
			};
		case constants.DELETE_PRODUCTT_SUCCESS:
			let products = state.product.filter(product => product.id !== action.data);
			return {
				...state,
				product: products,
			};
		default:
			return state;
	}
};
