import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

class Game extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    questionText: PropTypes.string.isRequired,
    outputText: PropTypes.string,
    loadingAnswer: PropTypes.bool.isRequired,
    hasErrors: PropTypes.bool,
    onChangeValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render () {
    const { classes, questionText, outputText, loadingAnswer, hasErrors, onChangeValue, onSubmit } = this.props

    return (
      <Grid container className={classes.root} spacing={24} alignItems="center" justify="center" direction="column">
        <Grid item xs={12}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Eight Ball Answers
          </Typography>
          <Typography variant="body1" gutterBottom>
            Get instant advice on what's troubling you.
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.tip}>
            Make sure to ask a yes/no question to get the perfect answer.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={hasErrors}
            className={classes.textField}
            margin="normal"
            value={questionText}
            onChange={onChangeValue}
            disabled={loadingAnswer}
            maxLength="4"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmit}
            disabled={loadingAnswer}
          >
            {loadingAnswer ? (
              <CircularProgress className={classes.buttonContent} color="secondary" />
            ) : (
              <Typography variant="button" gutterBottom className={classes.buttonContent}>
                Ask question
              </Typography>
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          {outputText && (
            <div>
              <span className={hasErrors ? classes.errorText : undefined}>{outputText}</span>
            </div>
          )}
        </Grid>
      </Grid>
    )
  }
}

const formWidth = 200

const styles = theme => ({
  root: {
    marginTop: 40,
    display: 'flex'
  },
  textInput: {
    width: formWidth
  },
  button: {
    width: formWidth,
    margin: theme.spacing.unit
  },
  buttonContent: {
    height: 40
  },
  errorText: {
    color: 'red'
  }
})

export default withStyles(styles)(Game)
