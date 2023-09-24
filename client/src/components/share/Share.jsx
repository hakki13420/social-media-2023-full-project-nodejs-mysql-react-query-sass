import { useContext, useState } from 'react'
import { authContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import { privateRequest } from '../../axiosRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Share = () => {
  const { currentUser } = useContext(authContext)
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handlChange = (e) => {
    setContent(e.target.value)
  }

  const changeFile = (e) => {
    setFile(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const { data } = await privateRequest.postForm('upload', formData)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const queryClient = useQueryClient()
  const mutation = useMutation(
    newPost => privateRequest.post('posts', newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts'])
      }
    }
  )

  const sharePost = async (e) => {
    e.preventDefault()
    let url = ''
    if (file) {
      // upload image and get url
      url = await uploadImage()
    }
    mutation.mutate({
      content,
      picture: url
    })
    setFile(null)
    setPreview(null)
    setContent('')
  }

  return (
    <div className="share">
      <div className="top">
        <div className="left">
          <div className="user">
            <Link to={'/profile/' + currentUser.id}>
              <img src={'/public/uploads/' + currentUser.profilePicture} alt="profile" />
            </Link>
          </div>
          <input type="text"
            placeholder={`What's on your mind ${currentUser.username}`}
            name="content"
            onChange={handlChange}
          />
        </div>
        <div className="right">
          {preview && <img className='preview-image' src={preview} />}

        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <input type="file"
            name="file"
            id="file"
            onChange={changeFile}
          />
          <button>
            <label htmlFor="file">
              <AddAPhotoOutlinedIcon/>
              <span>
                Add Image
              </span>
            </label>
          </button>
        </div>
        <button onClick={sharePost}>Share</button>
      </div>
    </div>)
}

export default Share
