import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { HiOutlineLogout } from "react-icons/hi";
import avatar from '../../assets/avatar.png'

export default function Header() {
  return (
    <Box px={6}>
      <VStack spacing={6}>
        <HStack w='100%'>
          <HStack w='50%'>
            <Avatar style={{ size: '42px' }} src={avatar} />
            <Text fontSize='lg' fontWeight='600'>ABC</Text>
          </HStack>
          <Box w='50%' justifyContent='end' display='flex'>
            <Box h={10} w={10} borderRadius='50%' bgColor='#1F2A37' display='flex' alignItems='center' justifyContent='center'>
              <HiOutlineLogout size={18} color="#FFFFFF" />
            </Box>
          </Box>
        </HStack>

        <Heading as='h2' size='lg'>
          Welcome
        </Heading>
      </VStack>
    </Box>
  )
}