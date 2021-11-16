import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import EachItem from '../EachItem'
import './index.css'

class EditorsPickPlaylist extends Component {
  state = {allData: '', musicList: []}

  componentDidMount() {
    this.getEditorsPlayList()
  }

  getEditorsPlayList = async () => {
    const jwt = Cookies.get('pa_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const optionsInfo = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const Infourl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const responseInfo = await fetch(Infourl, optionsInfo)

    if (responseInfo.ok === true) {
      const data = await responseInfo.json()
      console.log(data)
      const updatedInfoData = {
        collaborative: data.collaborative,
        description: data.description,
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        name: data.name,
        images: data.images,
        owner: data.owner,
        primaryColor: data.primary_color,
        public: data.public,
        snapshotId: data.snapshot_id,
        tracks: data.tracks,
        type: data.type,
        uri: data.uri,
      }

      const updateTrackData = data.tracks.items.map(each => ({
        album: each.track.album,
        albumType: each.track.album_type,
        artists: each.track.artists,
        availableMarkets: each.track.available_markets,
        discNumber: each.track.disc_number,
        durationMs: each.track.duration_ms,
        episode: each.track.episode,
        explicit: each.track.explicit,
        externalIds: each.track.external_ids,
        externalUrls: each.track.external_urls,
        href: each.track.href,
        id: each.track.id,
        isLocal: each.track.is_local,
        name: each.track.name,
        popularity: each.track.popularity,
        previewUrl: each.track.preview_url,
        track: each.track.track,
        trackNumber: each.track.type_number,
        type: each.track.type,
        uri: each.track.uri,
      }))

      this.setState({
        allData: updatedInfoData,
        musicList: updateTrackData,
      })
    }
  }

  renderEachAlbumDetails = () => {
    const {allData} = this.state
    const {name, owner} = allData

    return (
      <>
        <p>{name}</p>
        <p>{owner}</p>
      </>
    )
  }

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
    console.log(musicList)
    return (
      <ul className="unordered">
        {musicList.map(each => (
          <EachItem
            songData={each}
            key={each.id}
            isActive={activeId === each.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {musicList} = this.state
    console.log(musicList)
    return (
      <div className="app-container">
        <Navbar />
        <div>
          {this.displayData()}
          <hr className="line" />
          <ul className="names">
            <li className="item">Track</li>
            <li className="item">Album</li>
            <li className="item">Artist</li>
            <li className="item">time</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default EditorsPickPlaylist
