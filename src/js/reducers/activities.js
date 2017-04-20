import {
  ACTIVITIES_LOAD, ACTIVITIES_UNLOAD
} from '../actions';
import { createReducer } from './utils';

const initialState = {
  activities: []
};

const handlers = {
  [ACTIVITIES_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [ACTIVITIES_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
