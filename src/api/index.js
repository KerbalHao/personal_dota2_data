import axios from './axios'

 const homePage = () => {
  return axios.request({
    url: '/api/hero'
  })
}

const getDetail = (id) => {
  return axios.request({
    url: '/api/hero/' + id
  })
}

const getItems = () => {
  return axios.request({
    url: '/api/items'
  })
}

const fetchUser= (user) =>{
  return axios.request({
    method: 'post',
    url: '/mine/login', 
    data: user
  })
}

const validate = () => {
  return axios.request({
    url: '/mine/validate'
  })
}
export {
  homePage,
  getDetail,
  getItems,
  fetchUser,
  validate
}