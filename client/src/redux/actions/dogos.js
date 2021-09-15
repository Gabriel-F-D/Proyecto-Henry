import {dogoActions} from '../constants';

export const getDogos = (payload) => {
    return {
        type: dogoActions.GET_DOGOS,
        payload
    }
}

// export const filterDogos = (payload) => {
//     return {
//         type: dogoActions.FILTER_DOGOS,
//         payload
//     }
// }