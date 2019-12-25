import { constants } from '../constants/index';

const initialState = {
	product: null,
	products:null,
	shipping: null,
	error: false,
	sum: 0,
	paymentSuccess: false,
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
		case constants.SAVE_SUM:
			return{
				...state,
				sum: action.data,
			}
		case constants.PAYMENT_SUCCESS:
			return{
				...state,
				paymentSuccess: true,
			}
		case constants.PAYMENT_ERROR:
			return{
				...state,
				paymentSuccess: false,
			}
		default:
			return state;
	}
};
