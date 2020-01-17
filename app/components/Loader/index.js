/**
 *
 * Loader
 *
 */

import React, { memo } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  div: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  progress: {
    margin: 'auto',
  },
}));

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

Loader.propTypes = {};

export default memo(Loader);
