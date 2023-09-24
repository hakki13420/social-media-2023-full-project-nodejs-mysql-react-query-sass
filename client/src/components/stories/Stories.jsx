import { useContext, useState } from 'react'
import { authContext } from '../../context/authContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { privateRequest } from '../../axiosRequest'

/* const storiesData = [
  {
    id: 1,
    name: 'Hakki Rabah',
    image: 'https://images.pexels.com/photos/1482193/pexels-photo-1482193.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'Jhon Doe',
    image: 'https://images.pexels.com/photos/16903039/pexels-photo-16903039/free-photo-of-paysage-rochers-colline-riviere.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    name: 'Jhon Doe',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    name: 'Jhon Doe',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600'
  }

]
 */
const Stories = () => {
  const { currentUser } = useContext(authContext)
  const [file, setFile] = useState(null)

  const { isLoading, data: stories } = useQuery(['stories'], async () => {
    const res = await privateRequest.get('stories')
    return res.data
  })

  const queryClient = useQueryClient()
  const mutation = useMutation(
    newStory => privateRequest.post('stories', newStory),
    {
      onSuccess: () => queryClient.invalidateQueries('stories')
    }
  )

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await privateRequest.post('upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const addStory = async () => {
    const urlStory = await uploadFile()
    mutation.mutate({
      storyPicture: urlStory
    })
  }

  if (isLoading) return 'loading...'
  if (!stories.length) {
    return (<div className='stories'>
      <div className="story">
        <img src={'/public/uploads/' + currentUser.profilePicture} alt="image-story" />
        <span>{ currentUser.username}</span>
        <button title='add a story' style={{ left: '1rem' }} onClick={addStory}>
          <label htmlFor="story">
            +
          </label>
        </button>
        <input type="file" id='story' onChange={(e) => { setFile(e.target.files[0]) }} style={{ display: 'none' }} />
      </div>
    </div>)
  }
  return (
    <div className="stories">
      <div className="story">
        <img src={'/public/uploads/' + currentUser.profilePicture} alt="image-story" />
        <span>{ currentUser.username}</span>
        <button title='add a story'>+</button>
      </div>
      {
        stories?.map(str => (
          <div className='story' key={str.id}>
            <img src={'/public/uploads/' + str.storyPicture} alt="image-story" />
            <span>{str.username}</span>
          </div>
        ))
      }
    </div>
  )
}

export default Stories
