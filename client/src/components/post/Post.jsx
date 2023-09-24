import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { useContext, useState } from 'react'
import Comments from '../comments/Comments'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { privateRequest } from '../../axiosRequest'
import { authContext } from '../../context/authContext'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const Post = ({ post }) => {
  const [openMenuPost, setOpenMenuPost] = useState(false)
  const [comment, setComment] = useState(false)
  const { currentUser } = useContext(authContext)

  const handlComment = () => {
    setComment(!comment)
  }

  const { isLoading, error, data: comments } = useQuery(['comments', post.id], async () => {
    const res = await privateRequest.get('comments?post=' + post.id)
    return res.data
  })

  const { isLoading: likesIsLoading, data: likes } = useQuery(['likes', post.id], async () => {
    const res = await privateRequest.get('likes?post=' + post.id)
    return res.data
  })

  const queryClient = useQueryClient()
  const mutation = useMutation(
    (liked) => liked
      ? privateRequest.delete('likes?post=' + post.id)
      : privateRequest.post('likes', { postId: post.id }),

    {
      onSuccess: () => queryClient.invalidateQueries('likes')
    }
  )

  const handlLike = () => {
    mutation.mutate(
      likes.some(el => el.userId === currentUser.id)
    )
  }

  const removeMutation = useMutation(
    (shared) => (shared
      ? privateRequest.delete('posts/' + post.id + '?shared=1')
      : privateRequest.delete('posts/' + post.id)),
    {
      onSuccess: () => queryClient.invalidateQueries('posts')
    }
  )

  const removePost = () => {
    if (confirm('Are you shure to remove tnos post?')) {
      removeMutation.mutate(post.shared)
    }
    setOpenMenuPost(false)
  }

  const { isLoading: sharesIsLoading, data: shares } = useQuery(['shares', post.id], async () => {
    const res = await privateRequest.get('shares?post=' + post.id)
    return res.data
  })
  const shareMutation = useMutation(
    newShare => privateRequest.post('shares', newShare),
    {
      onSuccess: () => queryClient.invalidateQueries('posts')
    }
  )

  const sharePost = () => {
    console.log('share post', post.id, post)
    shareMutation.mutate({
      postId: post.id,
      fromUserId: post.publisher
    })
    setOpenMenuPost(false)
  }

  console.log('post   ', post)
  return (
    <div key={post.id} className="post">
      <div className="header">
        <div className="user">
          <h1>{post.id}</h1>
          <Link to={'/profile/' + post.publisher}>
            {
              post.profilePicture
                ? <img src={`/public/uploads/${post.profilePicture}`} alt="profile" />
                : <PersonOutlineOutlinedIcon/>
            }
          </Link>
          <div className="user-info">
            <span className="name">
              {post.username}
            </span>
            <span className="time">
              {moment(post.created_at).fromNow()}
            </span>
            {
              post.shared
                ? <span> shared <Link to={'/profile/' + post.owner}>{post.owner}</Link></span>
                : ''
            }
          </div>
        </div>
        <div className="post-menu">
          {
            !openMenuPost
              ? <MoreHorizOutlinedIcon onClick={() => setOpenMenuPost(true)}/>
              : <CancelOutlinedIcon onClick={() => setOpenMenuPost(false)}/>
          }
          {
            openMenuPost &&
            <div className="menu">
              {post.publisher === currentUser.id && <p onClick={removePost}>Remove</p>}
              {post.publisher === currentUser.id && <p>Modify</p>}
              <p onClick={sharePost}>Share</p>
            </div>
          }
        </div>
      </div>
      <div className="body">
        <img src={`/public/uploads/${post.picture}`} alt="post-image" />
        <p>{post.content}</p>
      </div>
      <div className="footer">
        <div className="item">
          {likesIsLoading
            ? 'loading...'
            : (likes.every(el => el.userId !== currentUser.id) && <FavoriteBorderOutlinedIcon onClick={handlLike}/>)}
          {likesIsLoading
            ? 'loading...'
            : (likes.some(el => el.userId === currentUser.id) && <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={handlLike}/>)}
          {likesIsLoading
            ? 'loading...'
            : <span>{likes?.length} like{likes?.length > 1 ? 's' : ''}</span>}
        </div>
        <div className="item" onClick={handlComment}>
          <MessageOutlinedIcon />
          {isLoading ? 'loading...' : <span>{comments.length} comment{comments.length > 1 ? 's' : ''}</span>}
        </div>
        <div className="item">
          <ShareOutlinedIcon/>
          {sharesIsLoading ? 'loading...' : <span>{`${shares?.length} share`}</span>}
        </div>
      </div>
      {comment && <Comments comments={comments} post={post.id}/>}
    </div>
  )
}

export default Post
