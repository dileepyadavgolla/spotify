import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import EditorsPickPlaylist from './components/EditorsPickPlaylist'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute
        exact
        path="/editor-pick/:id"
        component={EditorsPickPlaylist}
      />
    </Switch>
  </BrowserRouter>
)

export default App
