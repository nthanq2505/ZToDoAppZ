import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  Heading,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { getCurrentUser } from '../../utils/helpers'
export default function Register() {
  const navigate = useNavigate()
  const toast = useToast()

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const currentUser = getCurrentUser()

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [])

  async function onSubmit(values) {
    try {
      const registerResult = await registerAPI({
        fullName: values?.fullName,
        email: values?.email,
        password: values?.password
      })

      if (registerResult) {
        navigate('/login')
      }
    } catch (error) {
      if (error.response) {
        if (error.response?.status === axios.HttpStatusCode.Conflict) {
          setError('email', {
            type: 'manual',
            message: error.response.data.message
          })
        }
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          status: 'error',
          duration: 4000,
          isClosable: true
        })
      }
    }
  }

  return (
    <HStack
      spacing={0}
      height='100vh'
      overflowX='hidden'
      direction={{ base: 'column', md: 'row' }}
    >
      <Box
        width={{ base: '100%', md: '60%' }}
        bgGradient='linear(to-b, #7BCBD4 , #29C6B7)'
        color='white'
        height={{ base: 'auto', md: '100vh' }}
        display={{ base: 'none', md: 'flex' }}
        alignItems='center'
      >
        <VStack
          spacing={5}
          width='100%'
          alignItems='flex-start'
          px={10}
          ml={20}
        >
          <Heading as='h1' size='2xl'>
            Todo App
          </Heading>
          <Text fontSize='lg'>Manage your work every day</Text>
        </VStack>
      </Box>

      <Box
        width={{ base: '100%', md: '40%' }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <VStack
          as='form'
          align='stretch'
          spacing={10}
          width={{ base: '90%', md: '80%', lg: 'calc(100% - 260px)' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <VStack spacing={2} alignItems='start'>
            <Heading as='h2' size='lg'>
              Hello!
            </Heading>
            <Text fontSize='md'>Sign Up to Get Started</Text>
          </VStack>

          <VStack spacing={4}>
            <FormControl isInvalid={errors.fullName}>
              <FormLabel>Full name</FormLabel>
              <Input
                type='text'
                placeholder='John Holland'
                isDisabled={isSubmitting}
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
          </VStack>
          <VStack spacing={4} alignItems='start'>
            <Button
              colorScheme='teal'
              type='submit'
              w='100%'
              isLoading={isSubmitting}
            >
              Register
            </Button>

            <Text>
              Already have an account?{' '}
              <Link to='/login' style={{ color: 'teal' }}>
                Login here
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
