import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../../apis'

export default function Register () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatePassword, setRepeatePassword] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      navigate('/')
    }
  }, [])

  const handleRegister = async () => {
    if (!username || !password || !repeatePassword) {
      return alert('Please enter both username and password')
    }

    if (password !== repeatePassword) {
      return alert('Password and repeat password not match')
    }

    const registerResult = await registerAPI({
      username: username,
      password: password
    })
    if (registerResult) {
      navigate('/')
    }
  }

  return (
    <div className='container'>
      <div className='form'>
        <h2>
          <strong>Register</strong>
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
        <label htmlFor='password'>Repeat Password</label>
        <br />
        <input
          className='form__input'
          type='password'
          name='password'
          value={repeatePassword}
          onChange={event => setRepeatePassword(event.target.value)}
        />
        <br />
        <button className='login' onClick={handleRegister}>
          Register
        </button>
        <p>
          Already have an account? <Link to={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  )
}
