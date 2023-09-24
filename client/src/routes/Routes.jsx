import { useContext } from 'react'
import { authContext } from '../context/authContext'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/Home'
import Profile from '../pages/profile/Profile'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import { themeContext } from '../context/themeContext'
import NavBar from '../components/navbar/NavBar'
import LeftBar from '../components/leftbar/LeftBar'
import RightBar from '../components/rightbar/RightBar'
import FandF from '../pages/404/FandF'

const Layout = () => {
  const { theme } = useContext(themeContext)

  return (
    <div className={`layout theme-${theme}`}>
      <NavBar/>
      <LeftBar/>
      <Outlet/>
      <RightBar/>
    </div>
  )
}

const Routes = () => {
  const { currentUser } = useContext(authContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to='/login' />
    return children
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      errorElement: <FandF/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/profile/:id',
          element: <Profile/>
        }
      ]
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '*',
      element: <FandF/>
    }

  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Routes
