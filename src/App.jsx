import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import './styles.css'
import theme from './theme'
import { PersistGate } from 'redux-persist/lib/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  )
}
export default App
