import axios from 'axios'
import { API_ROOT } from 'ultilities/constants'

//Call API Get Full Board
export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  return request.data
}

//Call API Create New Column
export const createNewColumn = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, data)
  return request.data
}

//Call API Update Column & Remove Column -> change _destroy:true
export const updateColumn = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data)
  return request.data
}

//Call API Create New Card
export const createNewCard = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, data)
  return request.data
}
