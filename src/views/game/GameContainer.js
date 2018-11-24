import React, { Component } from 'react'
import Game from './Game'
import ApiService from '../../services/ApiService'
import moment from 'moment'

export default class GameContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      questionText: '',
      outputText: null,
      loadingAnswer: false,
      hasErrors: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeValue = this.onChangeValue.bind(this)

    this.fetchStatistics = this.fetchStatistics.bind(this)
  }

  componentDidMount () {
    this.fetchStatistics()
  }

  async fetchStatistics () {
    let hasErrors = false

    try {
      const partitionDate = parseInt(moment().format('YYYYMMDD'))

      const result = await ApiService.getDailyStats(partitionDate, partitionDate)
      console.log(result)
    } catch (err) {
      hasErrors = true
    }

    if (hasErrors) {
    }
  }

  onChangeValue (event) {
    this.setState({ questionText: event.target.value })
  }

  async onSubmit () {
    let hasErrors = false

    const { questionText } = this.state

    if (!questionText) {
      this.setState({
        outputText: 'Please insert a question.',
        hasErrors: true
      })
      return
    }

    this.setState({
      outputText: null,
      hasErrors: false,
      loadingAnswer: true
    })

    let response = null
    try {
      response = await ApiService.postQuestion(questionText)
    } catch (err) {
      hasErrors = true
    }

    if (response && response.ok) {
      this.setState({
        outputText: response.body.text,
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

  render () {
    return (
      <Game
        {...this.state}
        onChangeValue={this.onChangeValue}
        onSubmit={this.onSubmit}
      />
    )
  }
}
