import {Component} from 'react'
import moment from 'moment'
import Cookies from 'js-cookie'
import EditorsChoice from '../EditorsChoice'
import GenreAndMode from '../GenreAndMode'
import Navbar from '../Navbar'
import NewRelease from '../NewRelease'
import './index.css'

class SpotifyClone extends Component {
  state = {editorData: [], catList: [], newRelease: []}

  componentDidMount() {
    this.getData()
    this.getCategories()
    this.renderNewReleases()
  }

  getTimeStamp = () => {
    const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    return timeStamp
  }

  getData = async () => {
    const jwt = Cookies.get('pa_token')
    const url = 'https://api.spotify.com/v1/me'
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedUser = {
      country: data.country,
      displayName: data.display_name,
      email: data.email,
      explicitContent: data.explicit_content,
      externalUrls: data.external_urls,
      followers: data.followers,
      href: data.href,
      id: data.id,
      images: data.images,
      product: data.product,
      type: data.type,
      uri: data.uri,
    }

    const {country} = updatedUser
    const stamp = this.getTimeStamp()
    const editorsUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${stamp}`
    const editorResponse = await fetch(editorsUrl, options)

    if (editorResponse.ok === true) {
      const editorsData = await editorResponse.json()
      const updatedData = editorsData.playlists.items.map(each => ({
        collaborative: each.collaborative,
        externalUrls: each.external_urls,
        href: each.href,
        id: each.id,
        name: each.name,
        images: each.images,
        owner: each.owner,
        primaryColor: each.primary_color,
        public: each.public,
        snapshotId: each.snapshot_id,
        tracks: each.tracks,
        type: each.type,
        uri: each.uri,
        description: each.description,
      }))
      this.setState({editorData: updatedData})
    }
  }

  getCategories = async () => {
    const jwt = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const catUrl = 'https://api.spotify.com/v1/browse/categories'
    const catResponse = await fetch(catUrl, options)

    if (catResponse.ok === true) {
      const catData = await catResponse.json()

      const updatedData = catData.categories.items.map(each => ({
        href: each.href,
        id: each.id,
        name: each.name,
        icons: each.icons,
      }))
      this.setState({catList: updatedData})
    }
  }

  renderGenreAndMode = () => {
    const {catList} = this.state
    return (
      <ul className="unordered">
        {catList.map(each => (
          <GenreAndMode each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderNewReleases = async () => {
    const jwt = Cookies.get('pa_token')
    const url = 'https://api.spotify.com/v1/me'
    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const {country} = data
    const NewReleaseurl = `https://api.spotify.com/v1/browse/new-releases?country=${country}`

    const NewReleaseoptions = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    const NewReleaseresponse = await fetch(NewReleaseurl, NewReleaseoptions)

    if (NewReleaseresponse.ok === true) {
      const NewReleasedata = await NewReleaseresponse.json()

      const updated = NewReleasedata.albums.items.map(each => ({
        images: each.images,
        name: each.name,
      }))

      this.setState({newRelease: updated})
    }
  }

  getNewReleaseFun = () => {
    const {newRelease} = this.state

    return (
      <ul className="unordered">
        {newRelease.map(each => (
          <NewRelease each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {editorData} = this.state

    return (
      <div className="app-container">
        <Navbar />
        <div className="main-container">
          <h1 className="heading">Editor`s picks</h1>
          <ul className="unordered">
            {editorData.map(each => (
              <EditorsChoice each={each} key={each.id} />
            ))}
          </ul>
          <h1 className="heading">Genres and Moods</h1>
          {this.renderGenreAndMode()}
          <h1 className="heading">New Releases</h1>
          {this.getNewReleaseFun()}
        </div>
      </div>
    )
  }
}

export default SpotifyClone
