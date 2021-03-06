import React, { Component } from 'react'
import Game from './Game'
import ApiService from '../../services/ApiService'

export default class GameContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionText: '',
      outputText: null,
      assertion: null,
      loadingAnswer: false,
      hasErrors: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeValue = this.onChangeValue.bind(this)
  }

  onChangeValue(event) {
    this.setState({ questionText: event.target.value })
  }

  async onSubmit() {
    let hasErrors = false

    const { questionText } = this.state

    if (!questionText) {
      this.setState({
        outputText: 'Please insert a question.',
        assertion: null,
        hasErrors: true
      })
      return
    }

    this.setState({
      outputText: null,
      assertion: null,
      hasErrors: false,
      loadingAnswer: true
    })

    let response = null
    try {
      response = await ApiService.postQuestion(encodeURIComponent(questionText))
    } catch (err) {
      hasErrors = true
    }

    if (response && response.ok) {
      this.setState({
        outputText: response.body.text,
        assertion: response.body.assertion,
        hasErrors: false,
        loadingAnswer: false
      })
    } else {
      hasErrors = true
    }

    if (hasErrors) {
      this.setState({
        outputText: 'An error occurred.',
        hasErrors: true,
        loadingAnswer: false
      })
    }
  }

  render() {
    return (
      <Game
        {...this.state}
        onChangeValue={this.onChangeValue}
        onSubmit={this.onSubmit}
      />
    )
  }
}
