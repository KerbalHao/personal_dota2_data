import axios from './axios'

 const fetchData = () => {
  return axios.request({
    url: '/'
  })
}

const fetchUser= (user) =>{
  return axios.request({
    method: 'post',
    url: '/login', 
    data: user
  })
}

const editData = (payload) => {
  return axios.request({
    method: 'post',
    url: `/like/${payload.id}`,
    data:payload
  })
}

const validate = () => {
  return axios.request({
    url: '/checktoken',
  })
}

//data = [{numId, num}, ....]
const postItem = (payload) => {
  return axios.request({
    url: '/item/addcart',
    method: 'post',
    data:payload
  })

}

const postBought = (payload) => {
  return axios.request({
    url: '/item/buy',
    method: 'post',
    data: payload
  })
}

const setLogout= () => {
  return axios.request({
    url: '/user/exit',
  })
}

export {
  fetchData,
  fetchUser,
  editData,
  validate,
  postItem,
  postBought,
  setLogout
}