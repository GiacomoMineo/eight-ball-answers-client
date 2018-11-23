import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Game extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    questionText: PropTypes.string.isRequired,
    answerText: PropTypes.string,
    loadingAnswer: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    onChangeValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render () {
    const { classes, questionText, answerText, loadingAnswer, errorMessage, onChangeValue, onSubmit } = this.props

    return (
      <div className={classes.root}>
        <input value={questionText} onChange={onChangeValue} disabled={loadingAnswer} />
        <div>
          <Button variant="contained" color="primary" className={classes.button} onClick={onSubmit}>
            {loadingAnswer ? <CircularProgress className={classes.progress} color="secondary" /> : <span>Ask</span>}
          </Button>
        </div>
        {errorMessage && <div>
          <span>{errorMessage}</span>
        </div>}
        {answerText && <div>
          <span>{answerText}</span>
        </div>}
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    
  }
});

export default withStyles(styles)(Game)
