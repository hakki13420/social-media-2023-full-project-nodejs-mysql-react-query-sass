import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../components/notification/Notification'
import { publicRequest } from '../../axiosRequest'

const Register = () => {
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const [notification, setNotification] = useState(null)

  const handlChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  const addUser = async (e) => {
    e.preventDefault()
    try {
      const { data } = await publicRequest.post('/auth/register', inputs)
      if (data) {
        setNotification({
          message: data,
          type: 'success'
        })
        setInputs({
          name: '',
          username: '',
          email: '',
          password: ''
        })
      }
    } catch (error) {
      setNotification({ message: error.response.data, type: 'error' })
    }
  }

  notification && setTimeout(() => {
    setNotification(null)
  }, 4000)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>hello world!</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis deserunt excepturi reiciendis voluptas nisi nihil aut eos sunt, totam laboriosam doloremque eum quisquam optio asperiores!</p>
          <span>Dont you have a compt?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {notification && <Notification {...notification} />}
          <form onSubmit={addUser}>
            <input type="text" value={inputs.name} name="name" placeholder="full name" onChange={handlChange} />
            <input type="text" value={inputs.username} name="username" placeholder="Username" onChange={handlChange} />
            <input type="email" value={inputs.email} name="email" placeholder="Email" onChange={handlChange} />
            <input type="password" value={inputs.password} name="password" onChange={handlChange} placeholder="Password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
