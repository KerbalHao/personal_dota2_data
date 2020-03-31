import axios from 'axios'

class AxiosRequest{
  constructor() {
    this.baseURL = process.NODE_ENV === 'production' ? '/':'http://127.0.0.1:8888',
    this.timeout = 2000
  }

  setInterceptor(instance) {
    instance.interceptors.request.use( config => {
      config.headers.authorization = localStorage.getItem('token') || ''
      return config
    }, err => Promise.reject(err))

    instance.interceptors.response.use( res => {
      res = res.data
      if ('token' in res) {
        localStorage.setItem('token',res.token)
      }
      console.log(1)
      return res
    }, err => Promise.reject(err))
  }

  request(options) {
    let instance = axios.create()
    let config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout
    }
    this.setInterceptor(instance, options.url)
    return instance(config)
  }
}

export default new AxiosRequest