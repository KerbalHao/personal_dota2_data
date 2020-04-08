import axios from 'axios'

class AxiosRequest{
  constructor() {
    this.baseURL = process.NODE_ENV === 'production' ? '/':'http://127.0.0.1:8888/',
    this.timeout = 2000
  }

  setInterceptor(instance, cb) {
    instance.interceptors.request.use( config => {
      config.headers.authorization = localStorage.getItem('token') || ''
      return config
    }, err => Promise.reject(err).then(()=>{},cb))

    instance.interceptors.response.use( res => {
      let data = res.data
      if (data['token']) {
        localStorage.setItem('token',data.token)
      }
      return data
    }, err => Promise.reject(err).then(()=>{},cb))
  }

  request(options, cb) {
    let instance = axios.create()
    let config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {'Content-Type': 'application/json'}
    }
    this.setInterceptor(instance, cb)
    return instance(config)
  }
}

export default new AxiosRequest