import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { products } from './products';
import { comments } from './comments';
import { favorites } from './favorites';
import { carts } from './carts';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products,
            comments,
            favorites,
            carts
           
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}