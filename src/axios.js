import axios from 'axios'

export default {
  install: function (vue) {
    var result = axios.create({
      baseURL: 'http://tpadmin.test/api/'
    })
    result.interceptors.request.use(config=> {
      config.headers.Authorization = vue.prototype.$auth.getAuthorization()
      return config
    })
    vue.prototype.$http = result
  }
}
