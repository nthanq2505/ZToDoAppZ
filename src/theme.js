import { extendTheme } from '@chakra-ui/react'

const HEADER_HEIGHT = '40px'
const TASK_MANAGER_CONTAINER_HEIGHT = `calc(100%-${HEADER_HEIGHT})`

const theme = extendTheme({
  todo: {
    headerHeight: HEADER_HEIGHT,
    taskManagerContainerHeight: TASK_MANAGER_CONTAINER_HEIGHT
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '10px'
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '6px'
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: 'teal',
        borderRadius: '6px'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'teal.500'
      },
      html: {
        scrollbarColor: 'teal',
        scrollbarWidth: 'thin'
      }
    }
  },
  fonts: {
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif'
  }
})

export default theme
