import { Button, Checkbox, FormControl, FormErrorMessage, HStack, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function TaskItem({ task, handleDeleteTask, handleUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors, isSubmitting }
  } = useForm()

  useEffect(() => {
    setValue('taskName', task?.name)
  }, [])

  const handleClickEditTask = (event) => {
    event.preventDefault()
    setIsEditing(true)
    setFocus('taskName')
  }

  async function onSubmit(values) {
    setIsEditing(!isEditing)
    await handleUpdateTask({ ...task, name: values?.taskName })
  }

  const handleCancelEditTask = () => {
    setIsEditing(!isEditing)
    setValue("taskName", task.name)
  }

  async function handleClickTaskStatus() {
    await handleUpdateTask({ ...task, isDone: !task.isDone })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <HStack px={6} py={5} w='100%' justifyContent='space-between' bgColor='#F9FAFB' borderRadius={12} border={isEditing ? '1px solid teal' : 'none'}>
        <HStack spacing={4}>
          <Checkbox size='lg' spacing={6} colorScheme="teal" isChecked={task.isDone} onChange={handleClickTaskStatus} />
          <FormControl isInvalid={errors.taskName}>
            <Input
              variant="unstyled"
              isDisabled={isSubmitting}
              isReadOnly={!isEditing}
              style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}
              color={task.isDone ? 'gray.500' : '#1F2A37'}
              {...register('taskName', {
                required: 'This field can not be empty'
              })}
            />
            <FormErrorMessage>
              {errors.taskName && errors.taskName.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        {isEditing ?
          <HStack spacing={4} h={8}>
            <Button colorScheme='teal' variant='solid' size='sm' type="submit" isLoading={isSubmitting}>Save</Button>
            <Button colorScheme='red' variant='solid' size='sm' onClick={handleCancelEditTask} >Cancel</Button>
          </HStack> :
          <HStack spacing={4} h={8}>
            <Button colorScheme='teal' variant='outline' color={task.isDone ? 'gray' : 'teal'} size='sm' onClick={handleClickEditTask}>Edit</Button>
            <Button colorScheme='red' variant='outline' color={task.isDone ? 'gray' : 'red'} size='sm' onClick={() => { handleDeleteTask(task?._id) }} >Delete</Button>
          </HStack>}
      </HStack>
    </form>
  )
}