const LeftBarMenuItem = ({ image, title }) => {
  return (
    <div className="item">
      <img src={image} alt="image-item1" />
      <span>{title}</span>
    </div>
  )
}

export default LeftBarMenuItem
