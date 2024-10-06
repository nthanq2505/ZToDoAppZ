export default function TaskItem ({
  task,
  handleDeleteTask,
  handleOpenEditTaskModal,
  handleUpdateTask
}) {
  return (
    <li key={task?._id}>
      <input
        className='check-box'
        type='checkbox'
        checked={task?.isDone}
        onChange={() =>
          handleUpdateTask({
            task: { ...task, isDone: !task?.isDone },
            updateType: 'updateStatusTask'
          })
        }
      ></input>
      <span>{task?.name}</span>
      <button onClick={() => handleOpenEditTaskModal(task)}>Edit</button>
      <button
        className='red-button'
        onClick={() => handleDeleteTask(task?._id)}
      >
        Delete
      </button>
    </li>
  )
}
