import HttpClient, { HttpRequestMethods } from './api/HttpClient'
import singleton from 'singleton'

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

    return this.httpClient.send(url, method, requestOptions.headers, content, requestOptions.json)
  }

  postQuestion () {
    const requestUrl = `${this.apiUrl}/api/game/question`
    const requestContent = {
    }

    console.log(this.apiUrl)

    return this.request(requestUrl, HttpRequestMethods.post, requestContent)
  }
}

export default new ApiService()
