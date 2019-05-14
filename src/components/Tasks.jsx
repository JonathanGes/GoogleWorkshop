import React, { Component, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { withStyles, withTheme } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { computed, observable, action } from 'mobx';

import InviteesAutosuggest from './InviteesAutosuggest';


const taskStatuses = {
	todo: 'To Do',
	done: 'Done',
	pending: 'Pending'
}

const invitees = [
	{ name: 'Jonathan', email: 'jonathan@gmail.com' },
	{ name: 'Yoni', email: 'yoni@gmail.com' },
	{ name: 'Shir', email: 'shir@gmail.com' }
];

@inject('eventStore')
@observer
class Tasks extends Component {
	constructor(props) {
		super(props);
		const { eventStore } = this.props;
		const { selectedEvent } = eventStore;
		const { tasks, addTask, removeTask } = selectedEvent;
		const handleAddTask = () => addTask({ id: '2', title: 'Wow' });
		handleAddTask();
		this.state = {
      value: '',
      suggestions: []
    };
	}

	@computed
	get taskId() {
		const { eventStore } = this.props;
		const { selectedEvent } = eventStore;
		const { tasks, addTask, removeTask } = selectedEvent;

		return (parseInt(tasks[tasks.length - 1].id) + 1).toString();
	}

	render() {
		const { eventStore } = this.props;
		const { selectedEvent } = eventStore;
		const { tasks, addTask, removeTask } = selectedEvent;
    const { value, suggestions } = this.state;

		return (
			<div className="tasks">
				<MaterialTable
					title="Tasks"
					columns={[
						{ title: 'Title', field: 'title' },
						{ title: 'Status', field: 'status', lookup: taskStatuses },
						{ title: 'Assignee', field: 'assignee', editComponent: props => <InviteesAutosuggest onChange={props.onChange} invitees={invitees} /> }
					]}
					data={tasks.map(task => (task))}
					editable={{
						onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
									console.log(newData);
									addTask({id: this.taskId, ...newData});
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newTask, oldTask) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
									oldTask.updateTask(newTask);
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldTask =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
									removeTask(oldTask);
                }
                resolve()
              }, 1000)
            }),
					}}
					// actions={[
					// 	{
					// 		icon: 'add',
					// 		tooltip: 'Add Task',
					// 		isFreeAction: true,
					// 		onClick: () => addTask({ id: this.taskId, title: 'Enter task title' })
					// 	},
					// 	{
					// 		icon: 'delete',
					// 		tooltip: 'Delete Task',
					// 		onClick: (event, task) => removeTask(task)
					// 	}
					// ]}
				/>
			</div>
		)
	}
}

export default withTheme()(Tasks);