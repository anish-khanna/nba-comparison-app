import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the comparator state domain
 */

const selectComparatorDomain = state => state.comparator || initialState;

/**
 * Other specific selectors
 */

export const makeSelectComparatorPlayer0 = () =>
  createSelector(
    selectComparatorDomain,
    substate => substate.player0,
  );

export const makeSelectComparatorPlayer1 = () =>
  createSelector(
    selectComparatorDomain,
    substate => substate.player1,
  );

/**
 * Default selector used by Comparator
 */

const makeSelectComparator = () =>
  createSelector(
    selectComparatorDomain,
    substate => substate,
  );

export default makeSelectComparator;
export { selectComparatorDomain };
