import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Statistics extends Component {
  static propTypes = {
    statistics: PropTypes.arrayOf(PropTypes.shape({
      partitionDate: PropTypes.number,
      assertion: PropTypes.object,
      questionsCount: PropTypes.number
    })),
    loading: PropTypes.bool,
    classes: PropTypes.object
  }

  render() {
    const { statistics, loading, classes } = this.props

    return (
      <Grid container className={classes.root} spacing={24} alignItems="center" justify="center" direction="column">
        <Grid item xs={12}>
          {
            loading ?
            <CircularProgress color="primary" /> :
            <BarChart width={600} height={300} data={statistics}
              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="formattedDate"/>
              <YAxis />
              <Tooltip/>
              <Legend />
              <Bar dataKey="assertion.0" stackId="a" fill="#8884d8" />
              <Bar dataKey="assertion.1" stackId="a" fill="#82ca9d" />
              <Bar dataKey="assertion.2" stackId="a" fill="#ececec" />
            </BarChart>
          }
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: 40,
    display: 'flex'
  }
})

export default withStyles(styles)(Statistics)
