const { createBrowserRouter } = require('react-router-dom')
import HomePage from '../components/HomePage/HomePage'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <HomePage />
  }
])
