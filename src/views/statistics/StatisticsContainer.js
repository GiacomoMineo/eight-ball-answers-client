import React, { Component } from 'react'
import ApiService from './../../services/ApiService'
import Statistics from './Statistics'
import IntlService, { dateFormats } from '../../services/IntlService'

export default class StatisticsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      statistics: [],
      loading: true,
      errorMessage: null
    }

    this.fetchStatistics = this.fetchStatistics.bind(this)
  }

  componentDidMount () {
    this.fetchStatistics()
  }

  async fetchStatistics () {
    let hasErrors = false

    this.setState({
      loading: true
    })

    const partitionDate = IntlService.getPartitionDate()
    try {
      const response = await ApiService.getDailyStats(partitionDate, partitionDate)
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

  render () {
    return (
      <Statistics {...this.state} />
    )
  }
}
