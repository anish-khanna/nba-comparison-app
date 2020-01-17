/* eslint-disable prefer-destructuring */
/*
 *
 * Comparator reducer
 *
 */
import produce from 'immer';
import {
  GET_PLAYER0_INFO,
  PLAYER0_INFO_SUCCESS,
  PLAYER0_INFO_ERROR,
  GET_PLAYER1_INFO,
  PLAYER1_INFO_SUCCESS,
  PLAYER1_INFO_ERROR,
} from './constants';

export const initialState = {
  player0: {
    loading: false,
    error: false,
    data: {},
  },
  player1: {
    loading: false,
    error: false,
    data: {},
  },
};

/* eslint-disable default-case, no-param-reassign */
const comparatorReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PLAYER0_INFO:
        draft.player0.loading = true;
        break;
      case PLAYER0_INFO_SUCCESS:
        draft.player0.data = action.playerData;
        draft.player0.loading = false;
        draft.player0.error = false;
        break;
      case PLAYER0_INFO_ERROR:
        draft.player0.loading = false;
        draft.player0.error = action.error;
        break;
      case GET_PLAYER1_INFO:
        draft.player1.loading = true;
        break;
      case PLAYER1_INFO_SUCCESS:
        draft.player1.data = action.playerData;
        draft.player1.loading = false;
        draft.player1.error = false;
        break;
      case PLAYER1_INFO_ERROR:
        draft.player1.loading = false;
        draft.player1.error = action.error;
        break;
    }
  });

export default comparatorReducer;
