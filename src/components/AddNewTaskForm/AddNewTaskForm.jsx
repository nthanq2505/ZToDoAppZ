import { Button, FormControl, FormErrorMessage, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { addTaskAPI } from "../../apis";

export default function AddNewTaskForm({ getTasks }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()
  const user = useSelector(state => state.user)

  const [isAdding, setIsAdding] = useState(false)

  const handlechangeTaskInput = (event) => {
    if (event.target.value) {
      setIsAdding(true)
    }
  }

  const cancelAddingTask = () => {
    setIsAdding(false)
    reset({ 'taskName': '' })
  }

  async function onSubmit(values) {
    try {
      await addTaskAPI(user.token, {
        name: values?.taskName,
        isDone: false
      })
      getTasks()
      reset({ taskName: '' })
      setIsAdding(false)

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