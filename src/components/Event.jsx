/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Event = ({ event }) => (
	<Card className="card" css={css`
		padding-top: 20px;
		height: 200px;
		width: 200px;
	`}>
		<CardContent>
			{event.title}
		</CardContent>
	</Card>
);

export default Event;