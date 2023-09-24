import { createContext, useEffect, useState } from 'react'
import { privateRequest } from '../axiosRequest'

export const authContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem('user')) || null
  )

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  const login = async (inputs) => {
    // connect to backend
    console.log(inputs)
    const { data } = await privateRequest.post('auth/login',
      inputs
    )
    console.log('data auth', data)
    setCurrentUser(data)
  }
  const logout = () => {
    // connect to backend

    setCurrentUser(null)
    window.localStorage.clear('user')
  }

  return <authContext.Provider value={{ currentUser, login, logout }}>
    {children}
  </authContext.Provider>
}
