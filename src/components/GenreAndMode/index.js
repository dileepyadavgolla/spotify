import './index.css'

const GenreAndMode = props => {
  const {each} = props
  const {icons, name} = each
  const {url} = icons[0]

  return (
    <li className="list-item">
      <img src={url} alt={name} className="logoGM" />
    </li>
  )
}
export default GenreAndMode
