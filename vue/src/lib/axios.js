import axios from 'axios'
import { Spin } from 'view-design'
import { baseURL } from '../config'
import { getToken } from '@/lib/util'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = new Set()
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config
  }
  clear (queue, url, setTime) {
    queue.delete(url)
    clearTimeout(setTime)
    Spin.hide()
  }
  interceptors (instance, url) {
    var setTime
    instance.interceptors.request.use(config => {
      if (!this.queue.size) {
        setTime = setTimeout(() => Spin.show(), 100)
      }
      this.queue.add(url)
      config.headers['Authorization'] = `Bearer ${getToken()}`
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      this.clear(this.queue, url, setTime)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.clear(this.queue, url, setTime)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
