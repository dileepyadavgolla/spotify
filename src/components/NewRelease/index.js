import './index.css'

const NewRelease = props => {
  const {each} = props
  const {name, images} = each
  const {url} = images[0]

  return (
    <li className="list-item">
      <img src={url} className="logoT" alt="name" />
      <p className="para">{name}</p>
    </li>
  )
}

export default NewRelease
