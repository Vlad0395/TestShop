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

export const DeleteProduct = id => {
	return dispatch => {
		axios
			.delete('api/products/' + id)
			.then(response => {
				dispatch({
					type: constants.DELETE_PRODUCT_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				console.log('delete_error', error);
			});
	};
};

export const saveSum = (sum) => {
	return dispatch => {
		dispatch({
			type: constants.SAVE_SUM,
			data: sum,
		})
	}
}

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
}