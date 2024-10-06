import TaskItem from './TaskItem/TaskItem'

export default function TaskList ({
  tasks,
  handleDeleteTask,
  handleOpenEditTaskModal,
  handleUpdateTask
}) {
  return (
    <>
      {tasks.map(task => (
        <TaskItem
          key={task?._id}
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleOpenEditTaskModal={handleOpenEditTaskModal}
          handleUpdateTask={handleUpdateTask}
        />
      ))}
    </>
  )
}
