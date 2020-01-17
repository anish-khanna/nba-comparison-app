/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core';
import Comparator from 'containers/Comparator';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    height: '100%',
    minWidth: '100vw',
    minHeight: '100vh',
  },
  header: {
    fontSize: '70px',
    textAlign: 'center',
    margin: 'auto',
  },
  grid: {
    maxWidth: '1400px',
    margin: 'auto',
  },
  serchBarParent: {
    textAlign: 'center',
  },
  searchBar: {
    width: '95%',
  },
}));

export function HomePage() {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Player Comparator</title>
        <meta name="description" content="An NBA Player comparison tool." />
      </Helmet>
      <p className={classes.header}>Player Comparison</p>
      <Comparator />
    </div>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
