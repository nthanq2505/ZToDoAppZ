import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '../../apis'
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Heading,
  FormErrorMessage
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
export default function Register () {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      navigate('/')
    }
  }, [])

  async function onSubmit (values) {
    try {
      const registerResult = await loginAPI(values)

      if (registerResult) {
        navigate('/login')
      }
    } catch (error) {
      // setError('email', { type: 'manual', message: error.message });
    }
  }

  return (
    <HStack height='100vh' spacing={0}>
      <Box
        flex='1.56'
        bgGradient='linear(to-b, #7BCBD4 , #29C6B7)'
        color='white'
        height='100vh'
        display={{ base: 'none', lg: 'flex' }}
        alignItems='center'
      >
        <VStack
          spacing={6}
          width='100%'
          alignItems='flex-start'
          px={10}
          ml={10}
        >
          <Heading as='h1' size='2xl'>
            Todo App
          </Heading>
          <Text fontSize='lg'>Manage your work every day</Text>
        </VStack>
      </Box>

      <Box
        flex='1'
        px={{ base: 6, md: 20 }}
        py={16}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <VStack
          as='form'
          align='stretch'
          spacing={6}
          width='100%'
          maxW='320px'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading as='h2' size='lg'>
            Hello!
          </Heading>
          <Text fontSize='md'>Sign Up to Get Started</Text>

          <FormControl isInvalid={errors.fullName}>
            <FormLabel>Full name</FormLabel>
            <Input
              type='text'
              placeholder='John Holland'
              {...register('fullName', {
                required: 'This field can not be empty'
              })}
            />
            <FormErrorMessage>
              {errors.fullName && errors.fullName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type='text'
              placeholder='name@example.com'
              isDisabled={isSubmitting}
              id='email'
              {...register('email', {
                required: 'This field can not be empty',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: 'Invalid email format'
                }
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter password'
              isDisabled={isSubmitting}
              id='password'
              {...register('password', {
                required: 'This field can not be empty',
                minLength: {
                  value: 6,
                  message:
                    'Please enter a valid password. The password is required at least 6 characters'
                }
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPasssword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter confirm password'
              isDisabled={isSubmitting}
              id='confirmPasssword'
              {...register('confirmPasssword', {
                required: 'This field can not be empty',
                validate: val => {
                  if (watch('password') != val) {
                    return 'Password does not match'
                  }
                }
              })}
            />
            <FormErrorMessage>
              {errors.confirmPasssword && errors.confirmPasssword.message}
            </FormErrorMessage>
          </FormControl>

          <Text>
            Already have an account?{' '}
            <Link href='/login' color='teal.500'>
              Login here
            </Link>
          </Text>

          <Button
            colorScheme='teal'
            width='97px'
            type='submit'
            isLoading={isSubmitting}
          >
            Register
          </Button>
        </VStack>
      </Box>
    </HStack>
  )
}
