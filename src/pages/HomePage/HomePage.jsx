import { Box, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import TaskManageContainer from '../../components/TaskManageContainer/TaskManageContainer'

export default function HomePage() {
  const navigate = useNavigate()
  const {user,isAuthenticated} = useSelector(state => state)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [])

  return (
    <Box bgColor='#319795' w='100%' h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Box w={{ base: '95%', md: '85%', lg: '67%' }} h={{ base: '97%', md: '90%', lg: '87%' }} bgColor='white' borderRadius='24px' py={10} px={{ base: '10px', md: '40px', lg: '60px' }}>
        <VStack spacing={5} h='100%'>
          <Header user={user} />
          <TaskManageContainer />
        </VStack>
      </Box>
    </Box>
  )
}
