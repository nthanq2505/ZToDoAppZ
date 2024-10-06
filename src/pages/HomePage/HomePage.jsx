import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {
  addTaskAPI,
  deleteTaskAPI,
  fetchTaskAPI,
  updateTaskAPI
} from '../../apis'
import TaskList from './TaskLIst/TaskList'
import ModalEditTask from '../../components/ModalEditTask/ModalEditTask'
import { StateOfFilterTasks } from '../../utils/constants'

export default function HomePage () {
  const navigate = useNavigate()
  const currentUser =
    JSON.parse(localStorage.getItem('currentUser')) ||
    JSON.parse(sessionStorage.getItem('currentUser'))

  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const [isOpenModalEditTask, setIsOpenModalEditTask] = useState(false)
  const [currentEditTask, setCurrentEditTask] = useState({})
  const [filterStatus, setFilterStatus] = useState(StateOfFilterTasks.ALL)
  const [filteredTasks, setFilteredTasks] = useState([])

  const getTasks = async () => {
    const resultGetTask = await fetchTaskAPI(`Bearer ${currentUser?.token}`)
    setTasks(resultGetTask)
    handleFilterTask(resultGetTask, filterStatus)
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    } else {
      getTasks()
    }
  }, [])

  useEffect(() => {
    handleFilterTask(tasks, filterStatus)
  }, [filterStatus, tasks])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    navigate('/login')
  }

  const closeOpenModalEditTask = () => {
    setIsOpenModalEditTask(!isOpenModalEditTask)
  }

  const handleOpenEditTaskModal = task => {
    setCurrentEditTask(task)
    closeOpenModalEditTask()
  }

  const handleUpdateTask = async data => {
    if (!data.task.name && data?.updateType === 'updateTaskName') {
      return alert('You need fill to task name input')
    }

    const resultUpdateTast = await updateTaskAPI(
      `Bearer ${currentUser?.token}`,
      data.task
    )
    if (resultUpdateTast) {
      getTasks()
      if (data?.updateType === 'updateTaskName') {
        closeOpenModalEditTask()
      }
    }
  }

  const handleDeleteTask = async taskId => {
    alert(taskId)
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    )
    if (confirmDelete) {
      const resultDelete = await deleteTaskAPI(
        `Bearer ${currentUser?.token}`,
        taskId
      )
      if (resultDelete) {
        getTasks()
      }
    }
  }

  const handleAddTask = async () => {
    if (!taskName) {
      return alert('Please fill task name')
    }

    const addTaskResult = await addTaskAPI(`Bearer ${currentUser?.token}`, {
      name: taskName
    })

    if (addTaskResult) {
      getTasks()
    }
  }

  const handleClearTaskTileInput = () => {
    setTaskName('')
  }

  const handleChangeFilterStatus = event => {
    setFilterStatus(event.target.value)
  }

  const handleFilterTask = (tasks, filterStatus) => {
    if (filterStatus === StateOfFilterTasks.ALL) {
      setFilteredTasks(tasks)
    } else if (filterStatus === StateOfFilterTasks.DONE) {
      setFilteredTasks(tasks.filter(task => task.isDone))
    } else {
      setFilteredTasks(tasks.filter(task => !task.isDone))
    }
  }

  return (
    <>
      <div className='header'>
        <div>Henho {currentUser?.username}</div>
        <button className='red-button' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='container'>
        <img className='logo' src={logo} alt='Todo logo' />
        <h1 className='title'>TODO</h1>
        <div className='container__add'>
          <input
            type='text'
            className='add__input'
            placeholder='Task name'
            value={taskName}
            onChange={event => setTaskName(event.target.value)}
          />
          <button className='add__button' onClick={handleAddTask}>
            Add
          </button>
          <button
            className='red-button clear__button'
            onClick={handleClearTaskTileInput}
          >
            Clear
          </button>
        </div>
        {isOpenModalEditTask ? (
          <ModalEditTask
            currentEditTask={currentEditTask}
            closeOpenModalEditTask={closeOpenModalEditTask}
            handleUpdateTask={handleUpdateTask}
          />
        ) : null}
        <ul className='list__task'>
          <TaskList
            tasks={filteredTasks}
            handleDeleteTask={handleDeleteTask}
            handleOpenEditTaskModal={handleOpenEditTaskModal}
            handleUpdateTask={handleUpdateTask}
          />
        </ul>
        <form className='filter' action=''>
          <label htmlFor='filter'>Filter: </label>
          <select
            name='filter'
            id='filter'
            value={filterStatus}
            onChange={handleChangeFilterStatus}
          >
            <option value={StateOfFilterTasks.ALL}>All</option>
            <option value={StateOfFilterTasks.DONE}>Done</option>
            <option value={StateOfFilterTasks.NOT_DONE}>Not Done</option>
          </select>
        </form>
      </div>
    </>
  )
}
