import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../../apis'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRemember, setIsRemember] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      navigate('/')
    }
  }, [])

  const handleLogin = async () => {
    if (!username.length || !password.length) {
      return alert('Please enter both username and password')
    }
    const loginResult = await loginAPI({
      username: username,
      password: password
    })

    if (loginResult) {
      isRemember
        ? localStorage.setItem('currentUser', JSON.stringify(loginResult?.data))
        : sessionStorage.setItem(
            'currentUser',
            JSON.stringify(loginResult?.data)
          )
      navigate('/')
    }
  }

  return (
    <div className='container'>
      <div className='form'>
        <h2>
          <strong>Login</strong>
        </h2>
        <label htmlFor='username'>Username</label>
        <br />
        <input
          className='form__input'
          type='text'
          name='username'
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor='password'>Password</label>
        <br />
        <input
          className='form__input'
          type='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <br />
        <div className='remember'>
          <input
            className='remember__checkbox'
            type='checkbox'
            name='remember'
            value={isRemember}
            onChange={() => setIsRemember(!isRemember)}
          />
          <label htmlFor='remember'>Remember me</label>
        </div>
        <button className='login' onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account? <Link to={'/register'}>Register</Link>
        </p>
      </div>
    </div>
  )
}
