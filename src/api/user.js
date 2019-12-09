import axios from '@/utils/http'

export const isExist = (userName) => {
  return axios.post('/api/user/isExist', {
    'userName': userName
  })
}
