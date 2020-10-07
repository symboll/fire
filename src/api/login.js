import axios from './index'

export const login = ({ username, password }) => {
  return axios.request({
    url: '/auth/login',
    method: 'POST',
    data: { username, password }
  })
}

export const getUserInfoByToken = () => {
  return axios.request({
    url: '/auth/userInfo'
  })
}
