import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_PLAYER0_INFO, GET_PLAYER1_INFO } from './constants';
import {
  getPlayer0InfoError,
  getPlayer0InfoSuccess,
  getPlayer1InfoError,
  getPlayer1InfoSuccess,
} from './actions';

function* getPlayer0Info(action) {
  try {
    const retData = yield axios.get(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${
        action.playerId
      }&season=${action.seasonYear}`,
    );
    const data = retData.data.data[0];
    data.firstName = action.firstName;
    data.lastName = action.lastName;
    yield put(getPlayer0InfoSuccess(data));
  } catch (err) {
    yield put(getPlayer0InfoError(err));
  }
}

// Individual exports for testing
export function* player0Saga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_PLAYER0_INFO, getPlayer0Info);
}

function* getPlayer1Info(action) {
  try {
    const retData = yield axios.get(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${
        action.playerId
      }&season=${action.seasonYear}`,
    );
    const data = retData.data.data[0];
    data.firstName = action.firstName;
    data.lastName = action.lastName;
    yield put(getPlayer1InfoSuccess(data));
  } catch (err) {
    yield put(getPlayer1InfoError(err));
  }
}

// Individual exports for testing
export function* player1Saga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_PLAYER1_INFO, getPlayer1Info);
}
