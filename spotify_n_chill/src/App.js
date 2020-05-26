import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom"

import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'

import Homepage from './components/Homepage'
import RecommendationForm from './components/RecommendationForm'

const spotifyApi = new SpotifyWebApi()

class App extends React.Component {
  constructor() {
    super()
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      token: params.access_token,
    }
    if (params.access_token){
      spotifyApi.setAccessToken(params.access_token)
    }
    this.getHashParams = this.getHashParams.bind(this)
  }

  getHashParams() {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    console.log("Hash params:" + hashParams)
    return hashParams
  }
  
  render() {

    return(
      <BrowserRouter>
        <Switch>
          <Route path="/recommendation" component={() => <RecommendationForm />}/>
          <Route path="/" component={() => <Homepage 
            getHashParams={this.state.getHashParams}
            user={this.state} exact/>} 
          />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App;
