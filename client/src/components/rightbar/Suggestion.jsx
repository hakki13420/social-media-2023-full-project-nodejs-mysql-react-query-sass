import Avatar from '../avatar/Avatar'

const Suggestion = ({ suggestion }) => {
  return (
    <>
      <div className="user">
        {/* <div className="user-info"> */}
        {/* <img src={'/public/uploads/' + suggestion.profilePicture} alt="user-avatar" />
          <span>{suggestion.username}</span> */}
        <Avatar image={suggestion.profilePicture} username={suggestion.username}/>
        {/* </div> */}
        <div className="buttons">
          <button>Follow</button>
          <button>Desmiss</button>
        </div>
      </div>
    </>
  )
}

export default Suggestion
