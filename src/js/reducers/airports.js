import {
  AIRPORTS_LOAD, AIRPORTS_UNLOAD, AIRPORT_LOAD, AIRPORT_UNLOAD
} from '../actions';
import { createReducer } from './utils';

const initialState = {
  airports: [],
  airport: undefined
};

const handlers = {
  [AIRPORTS_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [AIRPORTS_UNLOAD]: () => initialState,
  [AIRPORT_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [AIRPORT_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
