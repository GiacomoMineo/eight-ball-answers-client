import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import logo from './../../assets/images/logo.png'
import './../../assets/styles/Navbar.css'
import { grey } from '@material-ui/core/colors'

class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.object
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container className={classes.navbar} alignItems="center" direction="row">
          <img src={logo} className={classes.logo} alt="logo" />
          <NavLink className={classes.navItem} to="/">
            Game
          </NavLink>
          <NavLink className={classes.navItem} to="/statistics">
            Statistics
          </NavLink>
      </Grid>
    )
  }
}

const styles = theme => ({
  navbar: {
    marginBottom: 40
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20
  },
  navItem: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    boxSizing: 'border-box',
    minHeight: '36px',
    fontWeight: 500,
    lineHeight: '1.4em',
    borderRadius: '4px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: grey[900]
  },
  navItemSelected: {
    color: 'blue'
  }
})

export default withStyles(styles)(Navbar)
