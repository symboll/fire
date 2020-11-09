import axios from './index'

export const Test = () => {
  return axios.request({
    url: '/users',
    methods: 'GET'
  })
}
