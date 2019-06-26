import React, { Component, useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { withStyles, withTheme } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import Chart from "react-apexcharts";
import Grid from "@material-ui/core/Grid";

const categories = {
	place: 'Place',
	food: 'Food',
  beverage: 'Beverage',
  content: 'Art Content',
  accessories: 'Accessories',
  sound: 'Sound',
  other: 'Other'
}

const totalGraph= {
  current: "Current",
  total: "Total"
}

@inject('eventStore')
@observer
class BudgetWidget extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      total: {
        options: {
          chart: {
            id: 'total'
          },
          xaxis: {
            categories: ["Total"]
          },
          yaxis: {
            title: {
                text: '$ Dollar'
            }
        },
        },
        series: [{
          name: totalGraph.current,
          data: [1500]
        },
        {
          name: totalGraph.total,
          data: [2200]
        }]
      },
      perCategory: {
        
        series: [44, 55, 13, 43, 22, 0, 15],
        options: {
          chart: {
              width: 200
          },
          legend: {
              position: 'right',
          },
          labels: [categories.place, categories.food, categories.beverage, categories.content, categories.accessories, categories.sound, categories.other],
        }
      }
    }
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Chart options={this.state.total.options} series={this.state.total.series} type="bar" width={350} height={320} />
        </Grid>
        <Grid item xs={6}>
          <Chart options={this.state.perCategory.options} series={this.state.perCategory.series} type="donut" width={500} height={320} />
        </Grid>
      </Grid>
    )
  }
}

export default withTheme()(BudgetWidget);