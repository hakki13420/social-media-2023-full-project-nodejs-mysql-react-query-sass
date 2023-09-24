import i1 from '../../assets/1.png'
import i2 from '../../assets/2.png'
import i3 from '../../assets/3.png'
import i4 from '../../assets/4.png'
import i5 from '../../assets/5.png'
import i6 from '../../assets/6.png'
import i7 from '../../assets/7.png'
import i8 from '../../assets/8.png'
import i9 from '../../assets/9.png'
import i10 from '../../assets/10.png'
import i11 from '../../assets/11.png'
import i12 from '../../assets/12.png'
import i13 from '../../assets/13.png'
import LeftBarMenuItem from './LeftBarMenuItem'
import { authContext } from '../../context/authContext'
import { useContext } from 'react'
import Avatar from '../avatar/Avatar'

const LeftBar = () => {
  const { currentUser } = useContext(authContext)
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="item">
            {/* <img src={currentUser.profilePicture} alt="user-avatar" />
            <span>{currentUser.username}</span> */}
            <Avatar image={currentUser.profilePicture} username={currentUser.username}/>
          </div>
          <LeftBarMenuItem image={i1} title='Friends' />
          <LeftBarMenuItem image={i2} title='Groups' />
          <LeftBarMenuItem image={i3} title='Marketplace' />
          <LeftBarMenuItem image={i4} title='Watch' />
          <LeftBarMenuItem image={i5} title='Memories' />
        </div>
        <hr />
        <div className="menu">
          <h1>Your shortcuts</h1>
          <LeftBarMenuItem image={i6} title='Events' />
          <LeftBarMenuItem image={i7} title='Gaming' />
          <LeftBarMenuItem image={i8} title='Gallery' />
          <LeftBarMenuItem image={i9} title='Videos' />
          <LeftBarMenuItem image={i10} title='Messages' />
        </div>
        <hr />
        <div className="menu">
          <h1>Others</h1>
          <LeftBarMenuItem image={i11} title='Fundraiser' />
          <LeftBarMenuItem image={i12} title='Tutorials' />
          <LeftBarMenuItem image={i13} title='Courses' />
        </div>
      </div>
    </div>
  )
}

export default LeftBar
