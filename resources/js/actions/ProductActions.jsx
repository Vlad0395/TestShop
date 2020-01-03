import { constants } from '../constants/index';
import axios from 'axios';

export const getProducts = () => {
	return dispatch => {
		axios
			.get('api/products')
			.then(response => {
				dispatch({
					type: constants.GET_PRODUCTS_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: constants.GET_PRODUCTS_ERROR,
					data: error,
				});
			});
	};
};

export const DeleteProduct = (id) => {
	return dispatch => {
		dispatch({
			type: constants.DELETE_PRODUCT,
			id,	
		});
	}
};

export const saveSum = (sum) => {
	return dispatch => {
		dispatch({
			type: constants.SAVE_SUM,
			data: sum,
		})
	}
};
export const saveNumbers = (numbers) => {
	return dispatch => {
		dispatch({
			type: constants.SAVE_NUMBERS,
			data: numbers,
		})
	}
}
export const costDelivery = (express, courier) => {
	return dispatch => {
		dispatch({
			type: constants.COST_DELIVERY,
			express: express,
			courier: courier,
		})
	}
};

export const payment = () => {
	return dispatch => {
		axios
			.post('api/payment')
			.then(response => {
				dispatch({
					type: constants.PAYMENT_SUCCESS,
					data: response.data,
				})
			})
			.catch(error => {
				dispatch({
					type: constants.PAYMENT_ERROR,
					data: error.data,
				})
				console.log('postForm', error)
			})
	}
};