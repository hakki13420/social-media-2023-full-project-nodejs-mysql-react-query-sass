import {
  SearchOutlined,
  HomeOutlined,
  DarkModeOutlined,
  GridViewOutlined,
  EmailOutlined,
  NotificationsNoneOutlined,
  LightModeOutlined
} from '@mui/icons-material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { useContext, useState } from 'react'
import { themeContext } from '../../context/themeContext'
import { authContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import Avatar from '../avatar/Avatar'

const NavBar = () => {
  const { theme, toggleTheme } = useContext(themeContext)
  const { currentUser, logout } = useContext(authContext)

  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  const changeTheme = () => {
    toggleTheme()
  }

  return (
    <div className="navbar">
      <div className="left">
        <div className="logo">
          <Link to='/'>
            <span>HakkiMedia</span>
          </Link>
        </div>
        <Link to='/'>
          <HomeOutlined className='icon'/>
        </Link>
        {theme === 'light' && <DarkModeOutlined onClick={changeTheme} />}
        {theme === 'dark' && <LightModeOutlined onClick={changeTheme}/>}
        <GridViewOutlined className='icon'/>
        <div className="search">
          <SearchOutlined onClick={() => setOpenSearch(!openSearch)} />
          <input type="search" placeholder='search...' style={{ display: openSearch ? 'block' : 'none' }} />
        </div>
      </div>
      <div className="menu-container">
        <div className="menu" style={{ display: openMenu ? 'block' : 'none' }}>
          <Link to='/profile'>
            <p >Profil</p>
          </Link>
          <p onClick={() => logout()}>Logout</p>
        </div>
        <MenuOutlinedIcon className='menu-icon' onClick={() => setOpenMenu(!openMenu)}/>
      </div>
      <div className="right">
        <EmailOutlined/>
        <NotificationsNoneOutlined />
        <div className="user-container">
          {/* {currentUser.profilePicture
            ? <img src={'/public/uploads/' + currentUser.profilePicture} alt="user-avatar" onClick={() => setOpenMenu(!openMenu)} />
            : <PersonOutlineOutlinedIcon/>
          }
          <span>{currentUser.username}</span> */}
          <Avatar openMenu={openMenu} setOpenMenu={setOpenMenu} image={currentUser.profilePicture} username={currentUser.username}/>
        </div>
      </div>

    </div>
  )
}

export default NavBar
