import './index.css'

const EachItem = props => {
  const {each} = props
  console.log(each)
  return (
    <li>
      <p className="color">track</p>
      <p>album</p>
      <p>durationMs</p>
      <p>artists</p>
    </li>
  )
}

export default EachItem
