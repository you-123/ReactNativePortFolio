import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { products } from './products';
import { comments } from './comments';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products,
            comments
           
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}