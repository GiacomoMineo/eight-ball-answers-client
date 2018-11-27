import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { red, green, yellow } from '@material-ui/core/colors'

class Output extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    text: PropTypes.string,
    assertion: PropTypes.number,
    hasErrors: PropTypes.bool,
    classes: PropTypes.object
  }

  render() {
    const { visible, text, assertion, hasErrors, classes } = this.props

    return (
      <div className={classes.root}>
        <Zoom direction="up" in={visible} mountOnEnter unmountOnExit timeout={{ enter: 600, exit: 0 }}>
          <Grid container direction="row" alignItems="center" justify="center" className={classes.outputContainer}>
            <span className={classNames(classes.assertion, classes[`assertion${assertion}`])} />
            <Typography variant="headline" align="center" className={classNames(classes.outputText, hasErrors ? classes.errorText : undefined)}>
              {text}
            </Typography>
          </Grid>
        </Zoom>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    height: 200
  },
  outputContainer: {
    marginTop: theme.spacing.unit * 4,
  },
  outputText: {
    fontWeight: '300'
  },
  errorText: {
    color: 'red'
  },
  assertion: {
    width: '16px',
    height: '16px',
    borderRadius: '16px',
    marginRight: theme.spacing.unit,
    display: 'inline-block'
  },
  assertion0: {
    backgroundColor: red[500]
  },
  assertion1: {
    backgroundColor: yellow[500]
  },
  assertion2: {
    backgroundColor: green[500]
  }
})

export default withStyles(styles)(Output)

