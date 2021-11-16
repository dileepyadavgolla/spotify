import {Component} from 'react'
import EachItem from '../EachItem'
import './index.css'

class Player extends Component {
  state = {...this.props, activeId: ''}

  displayData = () => {
    const {allData} = this.state
    const {images, name, owner} = allData
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
      <div>
        <img src={image} className="logoT" alt={name} />
        <h1 className="heading">Editor`s pick</h1>
        <p>{name}</p>
        <p>{owner}</p>
      </div>
    )
  }

  renderEachItemsFun = () => {
    const {activeId, musicList} = this.state

    return (
      <ul className="unordered">
        {musicList.map(each => (
          <EachItem songData={each} key="0" isActive={activeId === each.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.displayData()}
        <hr className="line" />
        <ul className="names">
          <li className="item">Track</li>
          <li className="item">Album</li>
          <li className="item">Artist</li>
          <li className="item">time</li>
        </ul>
        {this.renderEachItemsFun()}
      </div>
    )
  }
}

export default Player
