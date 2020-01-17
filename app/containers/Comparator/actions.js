/*
 *
 * Comparator actions
 *
 */

import {
  GET_PLAYER0_INFO,
  PLAYER0_INFO_SUCCESS,
  PLAYER0_INFO_ERROR,
  GET_PLAYER1_INFO,
  PLAYER1_INFO_SUCCESS,
  PLAYER1_INFO_ERROR,
} from './constants';

export function getPlayer0Info(playerId, seasonYear, firstName, lastName) {
  return {
    type: GET_PLAYER0_INFO,
    playerId,
    seasonYear,
    firstName,
    lastName,
  };
}

export function getPlayer0InfoSuccess(playerData) {
  return {
    type: PLAYER0_INFO_SUCCESS,
    playerData,
  };
}

export function getPlayer0InfoError(error) {
  return {
    type: PLAYER0_INFO_ERROR,
    error,
  };
}

export function getPlayer1Info(playerId, seasonYear, firstName, lastName) {
  return {
    type: GET_PLAYER1_INFO,
    playerId,
    seasonYear,
    firstName,
    lastName,
  };
}

export function getPlayer1InfoSuccess(playerData) {
  return {
    type: PLAYER1_INFO_SUCCESS,
    playerData,
  };
}

export function getPlayer1InfoError(error) {
  return {
    type: PLAYER1_INFO_ERROR,
    error,
  };
}
