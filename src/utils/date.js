import IntlService, { timeUnits, timeIntervals } from './../services/IntlService'

export default class DateUtils {
  static generateWeeksList() {
    const NUMBER_OF_WEEKS = 3

    const weeks = []
    const today = new Date()
    for (let i = 0; i < NUMBER_OF_WEEKS; i++) {
      const weekDate = IntlService.dateAdd(today, timeIntervals.weeks, -i)
      const startDate = IntlService.getStartUnitDate(weekDate, timeUnits.week)
      const endDate = IntlService.getEndUnitDate(weekDate, timeUnits.week)
      weeks.push({
        index: -i,
        label: i === 0 ? 'This week' : i === 1 ? 'Last week' : `${i} weeks ago`,
        startDate: startDate,
        endDate: endDate
      })
    }

    return weeks
  }
}
