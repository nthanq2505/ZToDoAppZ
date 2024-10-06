const { createBrowserRouter } = require('react-router-dom')
import HomePage from '../pages/HomePage/HomePage'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
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
