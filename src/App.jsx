import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './redux/store'
import './styles.css'
import theme from './theme'

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  )
}
export default App
