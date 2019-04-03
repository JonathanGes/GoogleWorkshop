import React from 'react';
import { css, jsx } from '@emotion/core'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const baseStyle = css`
	margin-top: 20px;
	height: 200px;
	width: 200px;
`;

const urgentStyle = css`
	background-color: red;
`

const Event = ({ event }) => (
	<Card className="card" css={[...(event.isUrgent ? [urgentStyle] : []), baseStyle]}>
		<CardHeader title={event.title} />
		<CardContent>
			<div>{`id: ${event.id} \n isUrgent: ${event.isUrgent}`}</div>
		</CardContent>
	</Card>
);

export default Event;