/**
 *
 * Comparator
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Grid, makeStyles } from '@material-ui/core';
import PlayerCard from 'components/PlayerCard/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectComparatorPlayer0,
  makeSelectComparatorPlayer1,
} from './selectors';
import reducer from './reducer';
import { player0Saga, player1Saga } from './saga';
import { getPlayer0Info, getPlayer1Info } from './actions';

const useStyles = makeStyles(() => ({
  grid: {
    maxWidth: '1400px',
    margin: 'auto',
  },
  searchBarParent: {
    textAlign: 'center',
    marginTop: '20px',
  },
  searchBar: {
    width: '95%',
  },
}));

export function Comparator(props) {
  useInjectReducer({ key: 'comparator', reducer });
  useInjectSaga({ key: 'player0', saga: player0Saga });
  useInjectSaga({ key: 'player1', saga: player1Saga });

  const { player0, player1, getPlayer0, getPlayer1 } = props;

  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={6} className={classes.searchBarParent}>
          <PlayerCard
            player={player0}
            otherPlayer={player1}
            getPlayer={getPlayer0}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.searchBarParent}>
          <PlayerCard
            player={player1}
            otherPlayer={player0}
            getPlayer={getPlayer1}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Comparator.propTypes = {
  player0: PropTypes.object,
  player1: PropTypes.object,
  getPlayer0: PropTypes.func,
  getPlayer1: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  player0: makeSelectComparatorPlayer0(),
  player1: makeSelectComparatorPlayer1(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPlayer0: (id, seasonYear, firstName, lastName) =>
      dispatch(getPlayer0Info(id, seasonYear, firstName, lastName)),
    getPlayer1: (id, seasonYear, firstName, lastName) =>
      dispatch(getPlayer1Info(id, seasonYear, firstName, lastName)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Comparator);
