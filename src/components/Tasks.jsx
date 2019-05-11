import React, { Component, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { withStyles, withTheme } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { computed, observable, action } from 'mobx';

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

		return (
			<div className="tasks">
				<MaterialTable
					title="Tasks"
					columns={[
						{ title: 'Title', field: 'title' },
					]}
					data={tasks.map(task => (task))}
					editable={{
						onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {

                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {

                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {

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