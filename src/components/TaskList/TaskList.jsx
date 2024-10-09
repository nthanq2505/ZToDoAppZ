import { VStack } from "@chakra-ui/react";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, handleDeleteTask, handleUpdateTask }) {
  return (
    <VStack spacing={5} w='100%' h='calc(100% - 72px - 60px)' overflowY='auto'>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} handleDeleteTask={handleDeleteTask} handleUpdateTask={handleUpdateTask} />
      ))}

    </VStack>
  )
}