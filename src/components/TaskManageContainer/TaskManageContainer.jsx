import { Divider, Flex, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { deleteTaskAPI, fetchTaskAPI, updateTaskAPI } from "../../apis";
import { StateOfFilterTasks } from "../../utils/constants";
import AddNewTaskForm from "../AddNewTaskForm/AddNewTaskForm";
import FilterTask from "../FilterTask/FilterTask";
import TaskList from "../TaskList/TaskList";


export default function TaskManageContainer() {
  const [tasks, setTasks] = useState([])
  const [filterValue, setFilterValue] = useState(StateOfFilterTasks.ALL)
  const toast = useToast()
  const user = useSelector(state => state.user)
  const [isLoadingTask, setIsLoadingTask] = useState(false);


  const getTasks = async () => {
    setIsLoadingTask(true)
    try {
      const resultGetTask = await fetchTaskAPI(user?.token, { isDone: filterValue })
      setTasks(resultGetTask.data)
    } catch (error) {
      toast(
        setToastContent(toastTitle.ERROR, message_error.INTERNAL_SERVER_ERROR, toastStatus.ERROR)

      )
    } finally {
      setIsLoadingTask(false)
    }
  }

  useEffect(() => {
    if (user?.token) { getTasks() }
  }, [filterValue])

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(user?.token, taskId)
      getTasks()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  const handleUpdateTask = async (data) => {
    try {
      await updateTaskAPI(user?.token, data)
      getTasks()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  return (
    <VStack w='100%' h='calc(100% - 40px)' spacing={5}>
      <AddNewTaskForm getTasks={getTasks} />
      <Divider color='#E2E8F0' />
      <FilterTask filterValue={filterValue} setFilterValue={setFilterValue} />
      {isLoadingTask ? (
        <Flex justifyContent='center' alignItems='center' h='100%'>
          <Spinner color="teal" size='lg' />
        </Flex>) : (
        <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask} />
      )}
    </VStack>
  )
}