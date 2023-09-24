import './_avatar.scss'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

const Avatar = ({ image, username, setOpenMenu, openMenu }) => {
  return (
    <div className='user-info'>
      {image
        ? <img src={'/public/uploads/' + image} alt="user-avatar" onClick={() => setOpenMenu(!openMenu)} />
        : <PersonOutlineOutlinedIcon/>
      }
      <span>{username}</span>
    </div>
  )
}

export default Avatar
