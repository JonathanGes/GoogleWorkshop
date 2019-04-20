import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {

};

@inject('eventStore')
@observer
class Event extends Component {
	constructor(props) {
		super(props);
		const { eventStore, location } = props;
		const pathArray = location.pathname.split('/');
		const eventId = pathArray[pathArray.length - 1];

		eventStore.setSelectedEvent(eventId);
	}

	render(props) {
		const { eventStore, location } = this.props
		const pathArray = location.pathname.split('/');
		const eventId = pathArray[pathArray.length - 1];
		

		return (
			<div className="event">
				<Typography variant="h6" color="primary">
					{`Event ID: ${eventStore.selectedEvent.id}`}
				</Typography>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(Event);