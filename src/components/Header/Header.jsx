import { Box, HStack, Text } from "@chakra-ui/react";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userActions";

export default function Header({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    sessionStorage.removeItem('currentUser')
    dispatch(logout())
    navigate('/login')
  }
  return (
    <HStack w='100%' display='flex' alignItems='center' px={6} h={10}>
      <HStack w='50%'>
        <Text fontSize='lg' fontWeight='600'>Welcome,</Text>
        <Text fontSize='lg' fontWeight='500'>{user?.fullName}</Text>
      </HStack>
      <Box w='50%' justifyContent='end' display='flex'>
        <Box h={10} w={10} borderRadius='50%' bgColor='#1F2A37' display='flex'
          alignItems='center' justifyContent='center' cursor='pointer' onClick={handleLogout} _hover={{ bgColor: 'gray' }}>
          <HiOutlineLogout size={18} color="#FFFFFF" />
        </Box>
      </Box>
    </HStack>
  )
}