import moment from 'moment'
import singleton from 'singleton'

class IntlService extends singleton {
  getPartitionDate (date) {
    const momentDate = date ? moment(date) : moment()
    return parseInt(momentDate.format('YYYYMMDD'))
  }

  formatDate (date, format) {
    if (date) {
      return moment(date).format(format)
    } else {
      return ''
    }
  }

  parseDate (dateString, format) {
    return moment.utc(dateString, format).toDate()
  }
}

export const dateFormats = {
  date: 'YYYY-MM-DD',
  partitionDate: 'YYYYMMDD'
}

export default new IntlService()
