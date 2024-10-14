import { Button, FormControl, FormErrorMessage, HStack, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { addTaskAPI } from "../../apis";
import { message_error, setToastContent, toastStatus, toastTitle } from "../../utils/constants";

export default function AddNewTaskForm({ getTasks }) {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()
  const user = useSelector(state => state.user)

  const [isAdding, setIsAdding] = useState(false)

  const handlechangeTaskInput = (event) => {
    if (event.target.value) {
      setIsAdding(true)
    }
  }

  const toast = useToast()

  const cancelAddingTask = () => {
    setIsAdding(false)
    reset({ 'taskName': '' })
  }

  async function onSubmit(values) {
    if (values.taskName.trim().length === 0) {
      return setError('taskName', {
        type: 'manual',
        message: 'This field can not be empty'
      })
    }
    try {
      await addTaskAPI(user.token, {
        name: values?.taskName.trim(),
        isDone: false
      })
      getTasks()
      reset({ taskName: '' })
      setIsAdding(false)
    } catch (error) {
      toast(
        setToastContent(toastTitle.ERROR, message_error.INTERNAL_SERVER_ERROR, toastStatus.ERROR)
      )
    }

  }
  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <HStack bg="white" borderRadius="lg" w='100%' justifyContent='space-between' p={6}>
        <HStack w='65%' h={6} spacing={4}>
          <TbSquareRoundedPlus size='24px' color='#D1D5DB' />
          <FormControl isInvalid={errors.taskName}>
            <Input
              placeholder="Add a new task..."
              variant="unstyled"
              isDisabled={isSubmitting}
              _placeholder={{ color: "#A0AEC0" }}
              {...register('taskName', {
                required: 'This field can not be empty', onChange: handlechangeTaskInput
              })}
            />
            <FormErrorMessage>
              {errors.taskName && errors.taskName.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <Button colorScheme="teal" size='sm' type='submit'
            isLoading={isSubmitting}>Add new</Button>
          {isAdding ? <Button colorScheme="red" size='sm'
            onClick={cancelAddingTask}>Cancel</Button> : null}
        </HStack>
      </HStack>
    </form>
  )
}