import { dogoActions } from '../constants';

const initialState = {
    dogos: null,
    // filteredDogos: null,
    // isFilterDogos: false
};

export default function dogosReducer(state = initialState, { type, payload }) {
    switch (type) {
        case dogoActions.GET_DOGOS:
            return {
                ...state,
                dogos: payload
            }
            break;
        default:
            return state
    }
}
