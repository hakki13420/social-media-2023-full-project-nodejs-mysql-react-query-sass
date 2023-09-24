import Post from '../post/Post'
import { privateRequest } from '../../axiosRequest'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

/* const postsData = [
  {
    id: 1,
    userName: 'Jhon Doe',
    userId: 1,
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quasi nesciunt, dignissimos et eius amet? Ipsum quod corrupti veniam doloribus ex quidem animi vitae possimus illo delectus voluptates pariatur dignissimos porro itaque corporis, est, consequuntur blanditiis maxime non eos dicta? Distinctio repellat animi laborum nobis. Delectus aliquid minus recusandae rerum?',
    image: 'https://images.pexels.com/photos/17960338/pexels-photo-17960338/free-photo-of-ville-monument-building-voyager.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    userName: 'Jhon Doe',
    userId: 1,
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quasi nesciunt, dignissimos et eius amet? Ipsum quod corrupti veniam doloribus ex quidem animi vitae possimus illo delectus voluptates pariatur dignissimos porro itaque corporis, est, consequuntur blanditiis maxime non eos dicta? Distinctio repellat animi laborum nobis. Delectus aliquid minus recusandae rerum?',
    image: 'https://images.pexels.com/photos/17960019/pexels-photo-17960019/free-photo-of-ville-fleurs-canal-voyager.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    userName: 'Jhon Doe',
    userId: 1,
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quasi nesciunt, dignissimos et eius amet? Ipsum quod corrupti veniam doloribus ex quidem animi vitae possimus illo delectus voluptates pariatur dignissimos porro itaque corporis, est, consequuntur blanditiis maxime non eos dicta? Distinctio repellat animi laborum nobis. Delectus aliquid minus recusandae rerum?',
    image: 'https://images.pexels.com/photos/17976859/pexels-photo-17976859/free-photo-of-tour-eiffel-france-monument-paris.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    userName: 'Jhon Doe',
    userId: 1,
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quasi nesciunt, dignissimos et eius amet? Ipsum quod corrupti veniam doloribus ex quidem animi vitae possimus illo delectus voluptates pariatur dignissimos porro itaque corporis, est, consequuntur blanditiis maxime non eos dicta? Distinctio repellat animi laborum nobis. Delectus aliquid minus recusandae rerum?',
    image: 'https://images.pexels.com/photos/18018814/pexels-photo-18018814/free-photo-of-monument-parc-voyager-fleur.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
] */

const Posts = ({ userId }) => {
  /* useEffect(() => {
    const getData = async () => {
      try {
        const { data } = privateRequest.get('posts')
        setPostsData(data)
      } catch (error) {
        console.timeLog(error)
      }
    }
    getData()
  }, [])
 */
  console.log('props userId', userId)
  const { isLoading, error, data } = useQuery(['posts', userId], () => {
    return privateRequest.get('posts?user=' + userId)
      .then(res => res.data)
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.removeItem('user')
        }
      })
  })
  if (isLoading) return '...loading'
  if (error) return 'error'
  return (
    <div className="posts">

      {
        data?.map(post => (
          <Post key={post.id} post={post}/>
        ))
      }

    </div>
  )
}

export default Posts
