/**
 *
 * PlayerCard
 *
 */

import React, { memo } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TextField,
  TableCell,
  Paper,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { debounce, isEmpty } from 'lodash';
import Downshift from 'downshift';
import Loader from 'components/Loader';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  name: {
    fontSize: '50px',
  },
  table: {
    margin: 'auto',
    width: '95%',
  },
  searchBar: {
    width: '80%',
    marginBottom: '10px',
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    marginTop: '-10px',
    left: `${25 / 2}%`,
    width: '75%',
    maxHeight: 300,
    overflow: 'scroll',
    backgroundColor: '#f0f0f0',
  },
}));

const getColors = (player, otherPlayer) => {
  const colors = {};
  if (player && otherPlayer) {
    if (otherPlayer.data.min != null) {
      if (otherPlayer.data.min < player.data.min) {
        colors.min = 'green';
      } else {
        colors.min = 'red';
      }
    } else {
      colors.min = 'inherit';
    }
    if (otherPlayer.data.fgm != null) {
      if (otherPlayer.data.fgm < player.data.fgm) {
        colors.fgm = 'green';
      } else {
        colors.fgm = 'red';
      }
    } else {
      colors.fgm = 'inherit';
    }
    if (otherPlayer.data.fga != null) {
      if (otherPlayer.data.fga < player.data.fga) {
        colors.fga = 'green';
      } else {
        colors.fga = 'red';
      }
    } else {
      colors.fga = 'inherit';
    }
    if (otherPlayer.data.fg_pct != null) {
      if (otherPlayer.data.fg_pct < player.data.fg_pct) {
        colors.fg_pct = 'green';
      } else {
        colors.fg_pct = 'red';
      }
    } else {
      colors.fg_pct = 'inherit';
    }
    if (otherPlayer.data.ftm != null) {
      if (otherPlayer.data.ftm < player.data.ftm) {
        colors.ftm = 'green';
      } else {
        colors.ftm = 'red';
      }
    } else {
      colors.ftm = 'inherit';
    }
    if (otherPlayer.data.fta != null) {
      if (otherPlayer.data.fta < player.data.fta) {
        colors.fta = 'green';
      } else {
        colors.fta = 'red';
      }
    } else {
      colors.fta = 'inherit';
    }
    if (otherPlayer.data.ft_pct != null) {
      if (otherPlayer.data.ft_pct < player.data.ft_pct) {
        colors.ft_pct = 'green';
      } else {
        colors.ft_pct = 'red';
      }
    } else {
      colors.ft_pct = 'inherit';
    }
    if (otherPlayer.data.fg3m != null) {
      if (otherPlayer.data.fg3m < player.data.fg3m) {
        colors.fg3m = 'green';
      } else {
        colors.fg3m = 'red';
      }
    } else {
      colors.fg3m = 'inherit';
    }
    if (otherPlayer.data.fg3a != null) {
      if (otherPlayer.data.fg3a < player.data.fg3a) {
        colors.fg3a = 'green';
      } else {
        colors.fg3a = 'red';
      }
    } else {
      colors.fg3a = 'inherit';
    }
    if (otherPlayer.data.fg3_pct != null) {
      if (otherPlayer.data.fg3_pct < player.data.fg3_pct) {
        colors.fg3_pct = 'green';
      } else {
        colors.fg3_pct = 'red';
      }
    } else {
      colors.fg3_pct = 'inherit';
    }
    if (otherPlayer.data.reb != null) {
      if (otherPlayer.data.reb < player.data.reb) {
        colors.reb = 'green';
      } else {
        colors.reb = 'red';
      }
    } else {
      colors.reb = 'inherit';
    }
    if (otherPlayer.data.ast != null) {
      if (otherPlayer.data.ast < player.data.ast) {
        colors.ast = 'green';
      } else {
        colors.ast = 'red';
      }
    } else {
      colors.ast = 'inherit';
    }
    if (otherPlayer.data.blk != null) {
      if (otherPlayer.data.blk < player.data.blk) {
        colors.blk = 'green';
      } else {
        colors.blk = 'red';
      }
    } else {
      colors.blk = 'inherit';
    }
    if (otherPlayer.data.stl != null) {
      if (otherPlayer.data.stl < player.data.stl) {
        colors.stl = 'green';
      } else {
        colors.stl = 'red';
      }
    } else {
      colors.stl = 'inherit';
    }
    if (otherPlayer.data.turnover != null) {
      if (otherPlayer.data.turnover < player.data.turnover) {
        colors.turnover = 'green';
      } else {
        colors.turnover = 'red';
      }
    } else {
      colors.turnover = 'inherit';
    }
    if (otherPlayer.data.pts != null) {
      if (otherPlayer.data.pts < player.data.pts) {
        colors.pts = 'green';
      } else {
        colors.pts = 'red';
      }
    } else {
      colors.pts = 'inherit';
    }
  }
  return colors;
};

function PlayerCard(props) {
  const { player, otherPlayer, getPlayer } = props;

  const [suggestions, setSuggestions] = React.useState([]);
  const [seasonYear, setSeasonYear] = React.useState(2019);

  const getSuggestions = debounce(async value => {
    if (isEmpty(value) || value.length < 3) {
      setSuggestions([]);
      return;
    }

    const { data } = await axios.get(
      `https://www.balldontlie.io/api/v1/players?search=${value}`,
    );
    setSuggestions(data.data);
  }, 350);

  const onInputChange = value => {
    getSuggestions(value);
  };

  const onChange = item => {
    getPlayer(item.id, seasonYear, item.first_name, item.last_name);
  };

  const onSeasonChange = event => {
    setSeasonYear(event.target.value);
  };

  const renderSuggestions = ({ highlightedIndex, getItemProps }) =>
    suggestions.map((s, index) => (
      <MenuItem
        {...getItemProps({ item: s })}
        key={s.id}
        selected={highlightedIndex === index}
        component="div"
        style={{
          fontWeight: 400,
        }}
      >
        {s.first_name} {s.last_name} - {s.team.abbreviation}
      </MenuItem>
    ));

  const seasonItems = [...Array(41).keys()].map(x => 2019 - x);

  const colors = getColors(player, otherPlayer);

  const classes = useStyles();

  if (!player || !getPlayer) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Downshift
        onInputValueChange={onInputChange}
        itemToString={item =>
          item ? `${item.first_name} ${item.last_name}` : ''
        }
        onChange={onChange}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          selectedItem,
        }) => (
          <div className={classes.container}>
            <TextField
              InputProps={{
                ...getInputProps(),
              }}
              variant="outlined"
              placeholder="Search for a player"
              className={classes.searchBar}
            />
            <div {...getMenuProps()}>
              {isOpen && suggestions.length > 0 ? (
                <Paper className={classes.paper} square>
                  {renderSuggestions({
                    highlightedIndex,
                    selectedItem,
                    getItemProps,
                  })}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
      <FormControl variant="outlined">
        <Select value={seasonYear} onChange={onSeasonChange}>
          {seasonItems.map(year => (
            <MenuItem key={year} value={year}>
              {year} - {year + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p className={classes.name}>
        {player.data.firstName} {player.data.lastName}
      </p>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell>Minutes</TableCell>
            <TableCell style={{ color: colors.min }}>
              {player.data.min}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Field Goals Made</TableCell>
            <TableCell style={{ color: colors.fgm }}>
              {player.data.fgm}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Field Goals Attempted</TableCell>
            <TableCell style={{ color: colors.fga }}>
              {player.data.fga}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Field Goal %</TableCell>
            <TableCell style={{ color: colors.fg_pct }}>
              {player.data.fg_pct}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Free Throws Made</TableCell>
            <TableCell style={{ color: colors.ftm }}>
              {player.data.ftm}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Free Throws Attempted</TableCell>
            <TableCell style={{ color: colors.fta }}>
              {player.data.fta}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Free Throw %</TableCell>
            <TableCell style={{ color: colors.ft_pct }}>
              {player.data.ft_pct}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Three Pointers Made</TableCell>
            <TableCell style={{ color: colors.fg3m }}>
              {player.data.fg3m}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Three Pointers Attempted</TableCell>
            <TableCell style={{ color: colors.fg3a }}>
              {player.data.fg3a}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Three Point %</TableCell>
            <TableCell style={{ color: colors.fg3_pct }}>
              {player.data.fg3_pct}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rebounds</TableCell>
            <TableCell style={{ color: colors.reb }}>
              {player.data.reb}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Assists</TableCell>
            <TableCell style={{ color: colors.ast }}>
              {player.data.ast}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Steals</TableCell>
            <TableCell style={{ color: colors.stl }}>
              {player.data.stl}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Blocks</TableCell>
            <TableCell style={{ color: colors.blk }}>
              {player.data.blk}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Turnovers</TableCell>
            <TableCell style={{ color: colors.turnover }}>
              {player.data.turnover}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Points</TableCell>
            <TableCell style={{ color: colors.pts }}>
              {player.data.pts}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object,
  otherPlayer: PropTypes.object,
  getPlayer: PropTypes.func,
};

export default memo(PlayerCard);
