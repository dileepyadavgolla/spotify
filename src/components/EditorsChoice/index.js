import {Link} from 'react-router-dom'
import './index.css'

const EditorsChoice = props => {
  const {each} = props
  const {id, name, images} = each
  let image
  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = null
  }

  return (
    <Link to={`/editor-pick/${id}`}>
      <li className="list-item">
        <img src={image} alt={name} className="imageT" />
        <p className="para">{name}</p>
      </li>
    </Link>
  )
}
export default EditorsChoice
