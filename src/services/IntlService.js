import moment from 'moment'
import 'moment/locale/en-gb'
import singleton from 'singleton'

class IntlService extends singleton {
  constructor() {
    super()

    moment.locale('en-gb')
  }

  getPartitionDate(date) {
    const momentDate = date ? moment(date) : moment()
    return parseInt(momentDate.format('YYYYMMDD'))
  }

  formatDate(date, format) {
    if (date) {
      return moment(date).format(format)
    } else {
      return ''
    }
  }

  parseDate(dateString, format) {
    return moment.utc(dateString, format).toDate()
  }

  getStartUnitDate(inputDate, timeUnit) {
    return moment
      .utc(inputDate)
      .startOf(timeUnit)
      .toDate()
  }

  getEndUnitDate(inputDate, timeUnit) {
    return moment
      .utc(inputDate)
      .endOf(timeUnit)
      .toDate()
  }

  dateAdd(date, timeInterval, timeIntervalValue) {
    return moment
      .utc(date)
      .add(timeIntervalValue, timeInterval)
      .toDate()
  }
}

export const dateFormats = {
  date: 'YYYY-MM-DD',
  partitionDate: 'YYYYMMDD'
}

export const timeUnits = {
  year: 'year',
  month: 'month',
  date: 'date',
  week: 'week',
  hour: 'hour',
  minute: 'minute',
  second: 'second',
  millisecond: 'millisecond'
}

export const timeIntervals = {
  years: 'years',
  months: 'months',
  weeks: 'weeks',
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds'
}

export default new IntlService()
