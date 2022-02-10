import axios from 'axios'
import { Loading } from 'element-ui'
axios.defaults.baseURL = 'https://netease-cloud-music-api-omega-topaz.vercel.app/'
let loadingInstance = null
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({ fullscreen: true })
  return config
})
axios.interceptors.response.use(response => {
  loadingInstance.close()
  return response
})
export default axios
