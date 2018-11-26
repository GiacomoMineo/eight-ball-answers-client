import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import './../assets/styles/App.css'

import GameContainer from './game/GameContainer'
import StatisticsContainer from './statistics/StatisticsContainer'
import Navbar from './components/Navbar';

class App extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  render() {
    const { classes } = this.props

    return (
      <Router>
        <Grid container className={classes.root} direction="column">
          <Navbar />

          <Route path='/' exact component={GameContainer} />
          <Route path='/statistics/' component={StatisticsContainer} />
        </Grid>
      </Router>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20
  }
})

export default withStyles(styles)(App)
