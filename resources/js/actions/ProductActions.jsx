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
				return dispatch({
					type: constants.DELETE_PRODUCT_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				console.log('delete_error', error);
			});
	};
};