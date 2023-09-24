import Avatar from '../avatar/Avatar'

const OnlineFriends = ({ friend }) => {
  return (
    <>
      <div className="user">
        <div className="user-info" style={{ opacity: friend.online ? '1' : '0.5' }}>
          {/*  <img src={'/public/uploads/' + friend.profilePicture} />
          <span>{friend.username}</span> */}
          <Avatar image={friend.profilePicture} username={friend.username} />
          <div className='online' style={{ backgroundColor: friend.online ? 'green' : 'red' }}></div>
        </div>
      </div>
    </>
  )
}

export default OnlineFriends
