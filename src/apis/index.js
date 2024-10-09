import { API_ROOT } from '../utils/constants'
import axios from 'axios'
const headersConfig = (token = null) => {
  if (token) {
    return {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  }
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
export const loginAPI = async user => {
  try {
    const response = await axios.post(
      `${API_ROOT}/api/login`,
      user,
      headersConfig()
    )
    return response
  } catch (error) {
    throw error
  }
}

export const registerAPI = async user => {
  try {
    const response = await axios.post(
      `${API_ROOT}/api/register`,
      user,
      headersConfig()
    )
    return response
  } catch (error) {
    throw error
  }
}

export const fetchTaskAPI = async (token, filter = {}) => {
  try {
    const queryParams = new URLSearchParams(filter).toString()
    const response = await axios.get(
      `${API_ROOT}/api/get-tasks?${queryParams}`,
      headersConfig(token)
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const addTaskAPI = async (token, newTaskData) => {
  try {
    const response = await axios.post(
      `${API_ROOT}/api/add-task`,
      newTaskData,
      headersConfig(token)
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteTaskAPI = async (token, taskId) => {
  try {
    const response = await axios.delete(
      `${API_ROOT}/api/delete-task/${taskId}`,
      headersConfig(token)
    )
    return response
  } catch (error) {
    throw error
  }
}

export const updateTaskAPI = async (token, updateTaskData) => {
  try {
    const response = await axios.put(
      `${API_ROOT}/api/update-task`,
      updateTaskData,
      headersConfig(token)
    )
    return response
  } catch (error) {
    throw error
  }
}
