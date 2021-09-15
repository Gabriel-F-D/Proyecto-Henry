import { combineReducers } from 'redux';
import dogosReducer from './dogoReducer';

const appReducer = combineReducers({
    dogos: dogosReducer
});

export default appReducer;