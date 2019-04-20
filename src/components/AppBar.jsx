import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';

const styles = theme => ({
  root: {
		flexGrow: 1,
		width: '100%',
		marginBottom: '50px'
	},
	toRight: {
		'margin-left': 'auto'
	},
	button: {
		color: 'white',
		textDecoration: 'none'
	}
});

function SimpleAppBar(props) {
  const { classes, location } = props;

  return (
    <div className={classes.root}>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            My Events
          </Typography>
					<Link to="/my-events" className={`${classes.toRight} ${classes.button}`}>
						<Button color="inherit" >My Events</Button>
					</Link>
					<Link to="/sign-in" className={classes.button}>
						<Button color="inherit">Login</Button>
					</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SimpleAppBar);
