import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import logo from './../assets/images/logo.png'
import './../assets/styles/App.css'

import GameContainer from './game/GameContainer'
import StatisticsContainer from './statistics/StatisticsContainer'

class App extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  render() {
    const { classes } = this.props

    return (
      <Router>
        <Grid container className={classes.root} spacing={24} direction="column">
          <Grid item xs={12}>
            <Button component={Link} to="/" variant="text" >
              <img src={logo} className={classes.logo} alt="logo" />
            </Button>
            <Button component={Link} to="/" variant="text">
              Game
            </Button>
            <Button component={Link} to="/statistics" variant="text">
              Statistics
            </Button>
          </Grid>

          <Route path='/' exact component={GameContainer} />
          <Route path='/statistics/' component={StatisticsContainer} />
        </Grid>
      </Router>
    )
  }
}

const styles = theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 20
  }
})

export default withStyles(styles)(App)
