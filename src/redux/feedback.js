import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = {errmess: null ,
                                feedbacks: [] }, action) => {
    switch(action.type) {
         
        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            return {...state, errmess: null, feedbacks: state.feedbacks.concat(feedback) };

        default: 
            return state;
    }
}