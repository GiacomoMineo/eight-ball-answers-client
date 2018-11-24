import HttpClient, { HttpRequestMethods } from './api/HttpClient'
import singleton from 'singleton'
import queryString from 'query-string'

class ApiService extends singleton {
  constructor () {
    super()

    this.apiUrl = process.env.REACT_APP_API_URL
    this.httpClient = new HttpClient()
  }

  async request (url, method, content, options) {
    const defaultOptions = {
      json: true,
      headers: {}
    }

    const requestOptions = Object.assign(defaultOptions, options)

    return this.httpClient.send(
      url,
      method,
      requestOptions.headers,
      content,
      requestOptions.json
    )
  }

  postQuestion (questionText) {
    const requestUrl = `${this.apiUrl}/api/game/question`
    const requestContent = {
      questionText
    }

    return this.request(requestUrl, HttpRequestMethods.post, requestContent)
  }

  getDailyStats (from, to) {
    const requestContent = {
      from: from,
      to: to
    }
    const requestUrl = `${
      this.apiUrl
    }/api/statistics/question?${queryString.stringify(requestContent)}`

    return this.request(requestUrl, HttpRequestMethods.get, requestContent)
  }
}

export default new ApiService()
