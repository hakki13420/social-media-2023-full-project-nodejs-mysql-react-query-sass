import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { privateRequest } from '../../axiosRequest'
import NoImage from '../NoImage/NoImage'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'

const UpdateProfile = ({ user, setOpenUpdate }) => {
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    country: user.country,
    webSite: user.webSite
  })
  const [files, setFiles] = useState({
    cover: null,
    profile: null
  })

  const handlChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlChangeFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] })
  }

  const queryClient = useQueryClient()

  const mutation = useMutation(
    newProfile => privateRequest.put('users/' + user.id, newProfile),
    {
      onSuccess: () => queryClient.invalidateQueries('user')
    }
  )

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await privateRequest.post('upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfile = async () => {
    const urls = {
      cover: user.coverPicture,
      profile: user.profilePicture
    }
    if (files.cover) urls.cover = await uploadFile(files.cover)
    if (files.profile) urls.profile = await uploadFile(files.profile)
    mutation.mutate({
      ...inputs,
      coverPicture: urls.cover,
      profilePicture: urls.profile
    })
    setOpenUpdate(false)
  }

  return (
    <div className="updateProfile">
      <span className='btn-close' onClick={() => setOpenUpdate(false)}>&times;</span>
      <div className="container">
        <div className="left">
          <input type="file" onChange={handlChangeFile} name='cover' id="cover" />
          <label className='cover-label' htmlFor="cover">
            {user.coverPicture
              ? <img title='Click over the image to change it' src={'/public/uploads/' + user.coverPicture} alt="" />
              : <NoImage/>
            }
          </label>
          <button onClick={updateProfile}>Update</button>
        </div>
        <div className="right">
          <div className="top">
            <h1>Update Profile</h1>
            <input type="file" onChange={handlChangeFile} name='profile' id="profile" />
            <label className='profile-label' htmlFor="profile">
              {user.profilePicture
                ? <img title='Click over the image to change it' src={'/public/uploads/' + user.profilePicture} alt="" />
                : <NoImage/>
              }
            </label>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="item-info">
                <label htmlFor="name">Name</label>
                <input type="text" id='name' onChange={handlChange} name='name' defaultValue={user.name} />
              </div>
              <div className="item-info">
                <label htmlFor="username">Username</label>
                <input type="text" id='username' onChange={handlChange} name='username' value={user.username} />
              </div>
              <div className="item-info">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' onChange={handlChange} name='email' value={user.email} />
              </div>
              <div className="item-info">
                <label htmlFor="country">Country</label>
                <input type="text" id='country' onChange={handlChange} name='country' value={user.country} />
              </div>
              <div className="item-info">
                <label htmlFor="web-site">Web-site</label>
                <input type="text" id='web-site' onChange={handlChange} name='webSite' value={user.webSite} />
              </div>
            </div>
            <div className="right">
              <div className="item-info">
                <label htmlFor="web-site">
                  <FacebookTwoToneIcon/>
                </label>
                <input type="text" id='facebook' onChange={handlChange} name='facebook' value={user.webSite} />
              </div>
              <div className="item-info">
                <label htmlFor="linkedIn">
                  <LinkedInIcon/>
                </label>
                <input type="text" id='linkedIn' onChange={handlChange} name='linkedIn' value={user.webSite} />
              </div>
              <div className="item-info">
                <label htmlFor="instagram">
                  <InstagramIcon/>

                </label>
                <input type="text" id='instagram' onChange={handlChange} name='instagram' value={user.webSite} />
              </div>
              <div className="item-info">
                <label htmlFor="pinterest">

                  <PinterestIcon/>
                </label>
                <input type="text" id='pinterest' onChange={handlChange} name='pnterest' value={user.webSite} />
              </div>
              <div className="item-info">
                <label htmlFor="twitter">
                  <TwitterIcon/>
                </label>
                <input type="text" id='twitter' onChange={handlChange} name='twitter' value={user.webSite} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
