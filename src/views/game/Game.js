import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Output from './components/Output'

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

  render() {
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
          <Output visible={!!outputText} text={outputText} assertion={assertion} hasErrors={hasErrors} />
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
  tip: {
    fontStyle: 'italic',
    fontSize: '12px'
  }
})

export default withStyles(styles)(Game)
