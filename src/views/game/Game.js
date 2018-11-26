import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { red, green, yellow } from '@material-ui/core/colors'

class Game extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    questionText: PropTypes.string.isRequired,
    outputText: PropTypes.string,
    assertion: PropTypes.number,
    loadingAnswer: PropTypes.bool.isRequired,
    hasErrors: PropTypes.bool,
    onChangeValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render () {
    const { classes, questionText, outputText, assertion, loadingAnswer, hasErrors, onChangeValue, onSubmit } = this.props

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Eight Ball Answers
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Get instant advice on what's troubling you.
          </Typography>
          <Typography variant="body1" align="center" gutterBottom className={classes.tip}>
            Make sure to ask a yes/no question to get the best answer.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center" >
            <Grid item sm={6} xs={10}>
              <TextField
                error={hasErrors}
                className={classes.textField}
                margin="normal"
                value={questionText}
                onChange={onChangeValue}
                disabled={loadingAnswer}
                maxLength="200"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center" >
            <Grid item sm={6} xs={10}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onSubmit}
                disabled={loadingAnswer}
                fullWidth
              >
                {loadingAnswer ? (
                  <CircularProgress className={classes.loader} color="primary" size={20} />
                ) : (
                  "Ask question"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {outputText && (
            <Grid container direction="row" alignItems="center" justify="center" className={classes.outputContainer}>
                <span className={classNames(classes.assertion, classes[`assertion${assertion}`])} />
                <Typography variant="headline" align="center" className={classNames(classes.outputText, hasErrors ? classes.errorText : undefined)}>
                  {outputText}
                </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex'
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    width: '100%'
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    height: 40
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
  tip: {
    fontStyle: 'italic',
    fontSize: '12px'
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

export default withStyles(styles)(Game)
