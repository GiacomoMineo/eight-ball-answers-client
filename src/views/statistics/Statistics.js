import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { red, green, yellow } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class Statistics extends Component {
  static propTypes = {
    statistics: PropTypes.arrayOf(PropTypes.shape({
      partitionDate: PropTypes.number,
      assertion: PropTypes.object,
      questionsCount: PropTypes.number
    })),
    loading: PropTypes.bool,
    classes: PropTypes.object,
    selectedWeekIndex: PropTypes.number.isRequired,
    weeksList: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number,
      label: PropTypes.string,
      startDate: PropTypes.object,
      endDate: PropTypes.object
    })),
    onWeekSelected: PropTypes.func.isRequired
  }

  render() {
    const { statistics, loading, classes, selectedWeekIndex, weeksList, onWeekSelected } = this.props

    return (
      <Grid container className={classes.root} spacing={24} alignItems="center" justify="center" direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Statistics
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {weeksList.map((week, weekIndex) => {
            return (
              <Button key={week.index} variant="contained" color={weekIndex === selectedWeekIndex ? "primary" : "default"} className={classes.button} onClick={() => { onWeekSelected(weekIndex) }}>
                {week.label}
              </Button>
            )
          })}
        </Grid>
        <Grid item xs={12}>
          {
            loading ?
            <CircularProgress color="primary" /> :
            <ResponsiveContainer width={700} height={300}>
              <BarChart data={statistics}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="formattedDate"/>
                <YAxis />
                <Tooltip/>
                <Legend />
                <Bar dataKey="assertion.0" stackId="a" fill={red[500]} maxBarSize={40} />
                <Bar dataKey="assertion.1" stackId="a" fill={yellow[500]} maxBarSize={40} />
                <Bar dataKey="assertion.2" stackId="a" fill={green[500]} maxBarSize={40} >
                  <LabelList dataKey="questionsCount" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
  },
  button: {
    margin: theme.spacing.unit,
  }
})

export default withStyles(styles)(Statistics)
