import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import PlaceIcon from '@mui/icons-material/Place'
import LanguageIcon from '@mui/icons-material/Language'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Posts from '../../components/posts/Posts'
import { useParams } from 'react-router-dom'
import { privateRequest } from '../../axiosRequest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { authContext } from '../../context/authContext'
import UpdateProfile from '../../components/updateProfile/UpdateProfile'
import NoImage from '../../components/NoImage/NoImage'

const Profile = () => {
  const { id } = useParams()
  const { currentUser } = useContext(authContext)
  const [openUpdate, setOpenUpdate] = useState(false)

  const { isLoading, error, data: user } = useQuery(['user'], async () => {
    const res = await privateRequest.get('users/' + id)
    return res.data
  })

  const { isloading: relationIsLoading, data: relationShips } = useQuery(['relationShips'], async () => {
    const res = await privateRequest.get('relationShips?followedId=' + id)
    return res.data
  })

  const queryClient = useQueryClient()
  const mutation = useMutation(
    followed =>
      followed
        ? privateRequest.delete('relationShips?followedId=' + id)
        : privateRequest.post('relationShips', { followed: id }),

    {
      onSuccess: () => queryClient.invalidateQueries('relationShips')
    }
  )
  const follow = () => {
    mutation.mutate(relationShips.some(el => el.follower === currentUser.id))
  }

  if (isLoading) return 'loading...'
  return (
    <div className="profile">
      <div className="container">
        <div className="images">
          {
            user.coverPicture
              ? <img src={'/public/uploads/' + user.coverPicture} className ='image-cover' alt="image-cover" />
              : <NoImage/>
          }
          <div className="container-profile">
            {
              user.profilePicture
                ? <img src={'/public/uploads/' + user.profilePicture} className ='image-profile' alt="image-profile" />
                : <NoImage className ='image-profile'/>
            }
          </div>
        </div>
        <div className="profile-container">

          <div className="top">
            <span className='name'>
              {user.name}
            </span>
            <div className="info">
              <div className="location">
                <PlaceIcon/>
                <span>{user.country}</span>
              </div>
              {currentUser.id === user.id && <button onClick={() => setOpenUpdate(true)}>Update</button>}
              {
                relationIsLoading
                  ? 'loading...'
                  : currentUser.id !== user.id && relationShips?.every(el => el.follower !== currentUser.id)
                    ? <button onClick={follow}>Follow</button>
                    : currentUser.id !== user.id && relationShips?.some(el => el.follower === currentUser.id)
                      ? <button onClick={follow}>Following</button>
                      : ''
              }

              <div className="contact">
                <LanguageIcon/>
                <span>{user.webSite}</span>

              </div>
            </div>
          </div>
          <div className="bottom">

            <div className="left">
              <FacebookTwoToneIcon/>
              <LinkedInIcon/>
              <InstagramIcon/>
              <PinterestIcon/>
              <TwitterIcon/>

            </div>
            <div className="right">
              <EmailOutlinedIcon/>
              <MoreVertIcon/>
            </div>
          </div>
        </div>

        <Posts userId={id}/>
      </div>
      {openUpdate && <UpdateProfile user={user} setOpenUpdate={setOpenUpdate}/>}
    </div>
  )
}

export default Profile
