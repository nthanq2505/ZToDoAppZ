import { API_ROOT } from '../utils/constants'
import axios, { HttpStatusCode } from 'axios'
const headersConfig = (token = '') => {
  return {
    headers: {
      authorization: token,
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
    if (error.response && error.response.status === HttpStatusCode.NotFound) {
      alert('Password or username not match')
    }
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
    if (error.response && error.response.status === HttpStatusCode.Conflict) {
      alert(error.response?.data)
    }
  }
}

export const fetchTaskAPI = async token => {
  try {
    const response = await axios.get(
      `${API_ROOT}/api/get-tasks`,
      headersConfig(token)
    )
    return response.data
  } catch (error) {
    alert('Cannot get task, plsease try again')
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
    alert('Cannot add task, plsease try again')
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
    alert('Cannot delete task, plsease try again')
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
    alert('Cannot update task, plsease try again')
  }
}