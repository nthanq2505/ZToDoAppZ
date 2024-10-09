import { Box, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import TaskManageContainer from '../../components/TaskManageContainer/TaskManageContainer'
import { getCurrentUser } from '../../utils/helpers'

export default function HomePage() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(getCurrentUser())
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [])

  return (
    <Box bgColor='#319795' w='100%' h='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Box w='67%' h='87%' bgColor='white' borderRadius='24px' py={10} px='60px'>
        <VStack spacing={5} h='100%'>
          <Header user={user} />
          <TaskManageContainer />
        </VStack>
      </Box>
    </Box>
  )
}
