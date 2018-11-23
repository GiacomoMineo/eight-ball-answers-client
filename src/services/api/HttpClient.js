class HttpResponse {
  constructor () {
    this.ok = false
    this.statusCode = null
    this.body = null
    this.headers = null
  }
}

export default class HttpClient {
  constructor (defaultHeaders = {}) {
    this.defaultHeaders = defaultHeaders || {}
  }

  async send (url = '', method = HttpRequestMethods.get, headers = {}, content = {}, isJsonContent = true) {
    let response

    try {
      let requestHeaders = {
        'content-type': isJsonContent ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      requestHeaders = {
        ...requestHeaders,
        ...this.defaultHeaders,
        ...headers
      }

      let request = {
        method: method,
        headers: requestHeaders
      }

      if (method !== HttpRequestMethods.get) {
        request.body = isJsonContent ? JSON.stringify(content) : new FormData(content)
      }

      let fetchResponse = await fetch(url, request)
      response = await this.getHttpResponse(fetchResponse)
    } catch (err) {
      try {
        response = await this.getHttpResponse(Response.error())
      } catch (err) {
        response = null
      }
    }

    return response
  }

  async get (url = '', headers = {}, content = {}, isJsonContent = true) {
    return this.send(url, HttpRequestMethods.get, headers, content, isJsonContent)
  }

  async post (url = '', headers = {}, content = {}, isJsonContent = true) {
    return this.send(url, HttpRequestMethods.post, headers, content, isJsonContent)
  }

  async put (url = '', headers = {}, content = {}, isJsonContent = true) {
    return this.send(url, HttpRequestMethods.put, headers, content, isJsonContent)
  }

  async delete (url = '', headers = {}, content = {}, isJsonContent = true) {
    return this.send(url, HttpRequestMethods.delete, headers, content, isJsonContent)
  }

  async getHttpResponse (fetchResponse) {
    const httpResponse = new HttpResponse()

    httpResponse.ok = fetchResponse.ok
    httpResponse.statusCode = fetchResponse.status
    httpResponse.headers = {}

    for (let headerKey in fetchResponse.headers.map) {
      httpResponse.headers[headerKey] = fetchResponse.headers.get(headerKey)
    }

    try {
      httpResponse.body = await fetchResponse.json()
    } catch (err) {}

    return httpResponse
  }
}

export const HttpRequestMethods = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
  patch: 'patch'
}
