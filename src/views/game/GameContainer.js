import React, { Component } from 'react'
import Game from './Game'
import ApiService from '../../services/ApiService'

export default class GameContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionText: '',
      answerText: null,
      loadingAnswer: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeValue = this.onChangeValue.bind(this)
  }

  onChangeValue (event) {
    this.setState({ questionText: event.target.value })
  }

  async onSubmit () {
    let hasErrors = false

    this.setState({
      errorMessage: null,
      loadingAnswer: true
    })

    const { questionText } = this.state
    let response = null
    try {
      response = await ApiService.postQuestion(questionText)
    } catch (err) {
      hasErrors = true
    }

    if (response && response.ok) {
      this.setState({
        answerText: response.body.text,
        loadingAnswer: false
      })
    } else {
      hasErrors = true
    }

    if (hasErrors) {
      this.setState({
        answerText: null,
        errorMessage: 'An error occurred.',
        loadingAnswer: false
      })
    }
  }

  render () {
    return (
      <Game {...this.state} onChangeValue={this.onChangeValue} onSubmit={this.onSubmit} />
    )
  }
}
