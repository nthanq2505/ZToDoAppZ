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
                <VStack spacing={2} alignItems='start'>
                  <FormLabel m={0}>Email Address</FormLabel>
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
                </VStack>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <VStack spacing={2} alignItems='start'>
                  <FormLabel m={0}>Password</FormLabel>
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
                </VStack>
              </FormControl>
            </VStack>

            <VStack spacing={4} alignItems='start'>
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
          </VStack>
        </Box>
      </HStack>
  )
}
