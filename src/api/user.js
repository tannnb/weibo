import axios from '@/utils/http'

export const getUserTest = () => {
  return axios.get('/banner')
}
