import React from 'react'

const LatestActivity = ({ name, image, action, time }) => {
  return (
    <>
      <div className="user">
        <div className="user-info">
          <img src={image} alt="user-avatar" />
          <p>
            <span>{name} </span>
            {action}
          </p>
        </div>
        <span>{time}</span>
      </div>
    </>
  )
}

export default LatestActivity
