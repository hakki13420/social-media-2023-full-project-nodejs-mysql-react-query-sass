const Notification = ({ message, type }) => {
  console.log('notification props   ', message, type)
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
    </div>
  )
}

export default Notification
