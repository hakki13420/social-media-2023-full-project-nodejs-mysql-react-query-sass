import { useContext, useState } from 'react'
import { authContext } from '../../context/authContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { privateRequest } from '../../axiosRequest'
import moment from 'moment'

/* const commentsData = [
  {
    id: 1,
    userName: 'Jhon Doe',
    userId: 1,
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio illum voluptates quasi magni explicabo ab recusandae ullam maiores, neque velit est debitis, molestiae earum excepturi, hic ut veniam iste.'
  },
  {
    id: 2,
    userName: 'Jhon Doe',
    userId: 1,
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600',
    comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio illum voluptates quasi magni explicabo ab recusandae ullam maiores, neque velit est debitis, molestiae earum excepturi, hic ut veniam iste.'
  }
] */

const Comments = ({ comments, post }) => {
  const { currentUser } = useContext(authContext)
  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()
  const mutation = useMutation(
    newComment => privateRequest.post('comments', newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments')
      }
    }
  )

  const addComment = (e) => {
    e.preventDefault()
    mutation.mutate({
      comment,
      postId: post
    })
    setComment('')
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="profile-picture" />
        <form onSubmit={addComment}>
          <input type="text" name='comment' value={comment} onChange={(e) => setComment(e.target.value)} placeholder="write a comment..." />
          <button>Send</button>
        </form>
      </div>
      {
        comments.map(comment => (
          <div key={comment.id} className="comment">
            <img src={comment.profilePicture} alt="image-user" />
            <div className="body-comment">
              <span className="name">{comment.userName}</span>
              <p>{comment.comment}</p>
            </div>
            <span>{moment(comment.created_at).fromNow()}</span>
          </div>
        ))
      }
    </div>
  )
}

export default Comments
