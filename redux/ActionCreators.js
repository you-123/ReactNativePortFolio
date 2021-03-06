import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchProducts = () => dispatch => {
     dispatch(productsLoading());
    return fetch(baseUrl + 'products')
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(products => dispatch(addProducts(products)))
        .catch(error => dispatch(productsFailed(error.message)));
};
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed =(errMess)  => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMess
});

export const addProducts =(products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload:products
});
export const postFavorite = productId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(productId));
    }, 2000);
};

export const addFavorite = productId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: productId
});
export const postToCart = productId => dispatch => {
    setTimeout(() => {
        dispatch(addToCart(productId));
    }, 2000);
};

export const addToCart = productId => ({
    type: ActionTypes.ADD_TO_CART,
    payload: productId
});