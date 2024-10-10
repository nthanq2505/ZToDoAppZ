import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../../apis'
import { login } from '../../redux/userActions'
export default function Login() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()

  const toast = useToast()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {isAuthenticated} = useSelector(state => state)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [])

  async function onSubmit(values) {
    try {
      const loginResult = await loginAPI({
        email: values?.email,
        password: values?.password
      })

      if (loginResult) {
        if (values?.isRemember) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(loginResult?.data?.data)
          )
        }
        dispatch(login(loginResult?.data?.data))
        navigate('/')
      }
    } catch (error) {
      if (error.response) {
        if (error.response?.status === axios.HttpStatusCode.NotFound) {
          setError('email', {
            type: 'manual',
            message: error.response.data.message
          })
        } else if (
          error.response?.status === axios.HttpStatusCode.Unauthorized
        ) {
          setError('password', {
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
              Welcome back!
            </Heading>
            <Text fontSize='md'>Login to Get Started</Text>
          </VStack>

          <VStack spacing={4}>
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
                  required: 'This field can not be empty'
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>

          <VStack spacing={4} alignItems='start'>
            <Checkbox
              colorScheme='teal'
              id='rememberMe'
              {...register('rememberMe')}
            >
              Remember Me
            </Checkbox>

            <Button
              colorScheme='teal'
              w='100%'
              type='submit'
              isLoading={isSubmitting}
            >
              Login
            </Button>

            <Text>
              Don&apos;t have an account?{' '}
              <Link to='/register' style={{ color: 'teal' }}>
                Register here
              </Link>
            </Text>

          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
