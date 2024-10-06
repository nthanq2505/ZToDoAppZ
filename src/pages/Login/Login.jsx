import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../../apis'
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
  FormErrorMessage,
  Checkbox,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
export default function Login () {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  const toast = useToast()

  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      navigate('/')
    }
  }, [])

  async function onSubmit (values) {
    try {
      const loginResult = await loginAPI({
        email: values?.email,
        password: values?.password
      })

      if (loginResult) {
        values?.isRemember
          ? localStorage.setItem(
              'currentUser',
              JSON.stringify(loginResult?.data)
            )
          : sessionStorage.setItem(
              'currentUser',
              JSON.stringify(loginResult?.data)
            )
        navigate('/')
      }
    } catch (error) {
      // toast({
      //   title: 'Error',
      //   description: 'An unexpected error occurred. Please try again.',
      //   status: 'error',
      //   duration: 4000,
      //   isClosable: true
      // })
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
            Welcome back!
          </Heading>
          <Text fontSize='md'>Login to Get Started</Text>

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

          <Text>
            Don&apos;t have an account?{' '}
            <Link href='/register' color='teal.500'>
              Register here
            </Link>
          </Text>

          <Button
            colorScheme='teal'
            width={75}
            type='submit'
            isLoading={isSubmitting}
          >
            Login
          </Button>
          <FormControl display='flex' alignItems='center'>
            <Checkbox
              colorScheme='teal'
              id='rememberMe'
              {...register('rememberMe')}
            >
              Remember Me
            </Checkbox>
          </FormControl>
        </VStack>
      </Box>
    </HStack>
  )
}
