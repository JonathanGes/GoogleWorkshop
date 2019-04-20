import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
		flexGrow: 1,
		width: '100%',
		marginBottom: '50px'
	},
	toRight: {
		'margin-left': 'auto'
	}
};

function SimpleAppBar(props) {
  const { classes, location } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            My Events
          </Typography>
					<Button color="inherit" className={classes.toRight}>My Events</Button>
					<Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SimpleAppBar);
