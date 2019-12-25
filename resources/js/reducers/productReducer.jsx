import { constants } from '../constants/index';

const initialState = {
	product: null,
	products:null,
	shipping: null,
	error: false,
	sum: 0,
	paymentSuccess: false,
	express: 9.99,
	courier: 19.99,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case constants.GET_PRODUCTS_SUCCESS:
			return{
				...state,
				products: action.data,
			};
		case constants.DELETE_PRODUCT:
			let products = state.products.filter(product => product.id !== action.id);
			return {
				...state,
				products: products,
			};
		case constants.SAVE_SUM:
			return{
				...state,
				sum: action.data,
			}
		case constants.COST_DELIVERY:
			return{
				...state,
				express: action.express,
				courier: action.courier,
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
