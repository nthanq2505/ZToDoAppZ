import { useState } from 'react'

export default function ModalEditTask ({
  closeOpenModalEditTask,
  currentEditTask,
  handleUpdateTask
}) {
  const [taskName, setTaskName] = useState(currentEditTask?.name)

  return (
    <div className='modal open' id='modal'>
      <div className='modal__inner'>
        <h2>Edit Task</h2>
        <input
          type='text'
          className='edit__input'
          placeholder='Task name'
          value={taskName}
          onChange={event => setTaskName(event.target.value)}
        />
        <div className='modal__button'>
          <button
            className='save-modal'
            onClick={() =>
              handleUpdateTask({
                task: { ...currentEditTask, name: taskName },
                updateType: 'updateTaskName'
              })
            }
          >
            Save
          </button>
          <button
            className='red-button cancel-modal'
            onClick={closeOpenModalEditTask}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
