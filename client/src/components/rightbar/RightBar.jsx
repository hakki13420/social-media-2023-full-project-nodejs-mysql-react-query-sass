import { useContext } from 'react'
import { privateRequest } from '../../axiosRequest'
import LatestActivity from './LatestActivity'
import OnlineFriends from './OnlineFriends'
import Suggestion from './Suggestion'
import { authContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
const i = 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600'

const RightBar = () => {
  const { currentUser } = useContext(authContext)

  const { isLoading, data: friends } = useQuery(['onlineFriends'], async () => {
    const res = await privateRequest('users?friends=' + currentUser.id)
    return res.data
  })

  const { isLoading: suggIsLoading, data: suggestions } = useQuery(['suggestions'], async () => {
    const res = await privateRequest('users?suggestion=' + currentUser.id)
    return res.data
  })

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <h1>Suggesyio for you</h1>
          {
            suggIsLoading
              ? 'loading...'
              : (
                <>
                  {
                    suggestions?.map(suggestion => <Suggestion key={suggestion.id} suggestion={suggestion}/>)
                  }
                </>
              )
          }
        </div>
        <div className="item">
          <h1>Latest Activities</h1>
          <LatestActivity name='Jhon Doe' image={i} action='changed their cover picture' time='1min ago'/>
          <LatestActivity name='Jhon Doe' image={i} action='changed their cover picture' time='1min ago'/>
          <LatestActivity name='Jhon Doe' image={i} action='changed their cover picture' time='1min ago'/>
        </div>
        <div className="item">
          <h1>Online Friends</h1>
          {
            isLoading
              ? 'loading...'
              : (
                <>
                  {friends?.map(friend => <OnlineFriends key={friend.id} friend={friend} />)}
                </>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default RightBar
