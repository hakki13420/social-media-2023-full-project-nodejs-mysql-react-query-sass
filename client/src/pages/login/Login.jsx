import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/authContext'
import { useContext, useState } from 'react'
import Notification from '../../components/notification/Notification'

const Login = () => {
  const { login } = useContext(authContext)
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState(null)

  const navigate = useNavigate()

  const authenticate = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/')
    } catch (error) {
      console.log('errorrrrrr ==', error)
      setErrors({ message: error.response.data, type: 'error' })
    }
  }

  const handlChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  errors && setTimeout(() => {
    setErrors(null)
  }, 4000)

  return (
    <div className="login">
      <div className="card">

        <div className="left">
          <h1>hello world!</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis deserunt excepturi reiciendis voluptas nisi nihil aut eos sunt, totam laboriosam doloremque eum quisquam optio asperiores!</p>
          <span>Dont you have a compt?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {errors && <Notification {...errors} />}
          <form action="#">
            <input type="text" placeholder="username" name='username' onChange={handlChange} />
            <input type="password" placeholder="Password" name='password' onChange={handlChange} />
            <button onClick={authenticate}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
