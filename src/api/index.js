import axios from './axios'

 const fetchData = (cb) => {
  return axios.request({
    url: '/'
  }, cb)
}

const fetchUser= (user,cb) =>{
  return axios.request({
    method: 'post',
    url: '/login', 
    data: user
  },cb)
}

const editData = (payload,cb) => {
  return axios.request({
    method: 'post',
    url: `/like/${payload.id}`,
    data:payload
  },cb)
}

const validate = (cb) => {
  return axios.request({
    url: '/checktoken',
  },cb)
}

//data = [{numId, num}, ....]
const postItem = (payload,cb) => {
  return axios.request({
    url: '/item/addcart',
    method: 'post',
    data: payload
  },cb)
}

const clearItem = (cb) => {
  return axios.request({
    url: '/item/clear',
  },cb)
}

const postBought = (payload,cb) => {
  return axios.request({
    url: '/item/buy',
    method: 'post',
    data: payload
  },cb)
}

const setLogout= (cb) => {
  return axios.request({
    url: '/user/exit',
  },cb)
}

const postRegister= (payload, cb) => {
  return axios.request({
    url:'/user/register',
    method: 'post',
    data: payload
  },cb)
}

export {
  postRegister,
  clearItem,
  fetchData,
  fetchUser,
  editData,
  validate,
  postItem,
  postBought,
  setLogout
}