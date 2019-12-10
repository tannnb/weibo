import axios from '@/utils/http'

export const isExist = (userName) => {
  return axios.post('/api/user/isExist', {
    'userName': userName
  })
}
export const isLogin = (userName, password) => {
  return axios.post('/api/user/login', {
    'userName': userName,
    'password': password
  })
}
export const isRegister = (userName, password) => {
  return axios.post('/api/user/register', {
    'userName': userName,
    'password': password
  })
}
