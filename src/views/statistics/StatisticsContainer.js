import React, { Component } from 'react'
import ApiService from './../../services/ApiService'
import Statistics from './Statistics'
import IntlService, { dateFormats } from '../../services/IntlService'
import DateUtils from '../../utils/date'

export default class StatisticsContainer extends Component {
  constructor (props) {
    super(props)

    this.weeksList = DateUtils.generateWeeksList()

    console.log(this.weeksList)

    this.state = {
      selectedWeekIndex: 0,
      statistics: [],
      loading: true,
      errorMessage: null
    }

    this.fetchStatistics = this.fetchStatistics.bind(this)
    this.onWeekSelected = this.onWeekSelected.bind(this)
  }

  componentDidMount () {
    this.fetchStatistics()
  }

  async fetchStatistics () {
    let hasErrors = false

    this.setState({
      loading: true
    })

    const { selectedWeekIndex } = this.state

    try {
      const response = await ApiService.getDailyStats(
        IntlService.formatDate(this.weeksList[selectedWeekIndex].startDate, dateFormats.partitionDate),
        IntlService.formatDate(this.weeksList[selectedWeekIndex].endDate, dateFormats.partitionDate)
      )
      if (response && response.ok) {
        this.setState({
          loading: false,
          statistics: response.body.map(stat => {
            return {
              ...stat,
              formattedDate: IntlService.formatDate(IntlService.parseDate(stat.partitionDate, dateFormats.partitionDate), dateFormats.date)
            }
          })
        })
      } else {
        hasErrors = true
      }
    } catch (err) {
      hasErrors = true
    }

    if (hasErrors) {
      this.setState({
        loading: false,
        errorMessage: 'An error occurred.'
      })
    }
  }

  onWeekSelected (weekIndex) {
    this.setState({
      selectedWeekIndex: weekIndex
    }, () => {
      this.fetchStatistics()
    })
  }

  render () {
    return (
      <Statistics {...this.state} weeksList={this.weeksList} onWeekSelected={this.onWeekSelected} />
    )
  }
}
