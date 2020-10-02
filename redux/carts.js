import * as ActionTypes from './ActionTypes';

export const carts = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        default:
            return state;
    }
};