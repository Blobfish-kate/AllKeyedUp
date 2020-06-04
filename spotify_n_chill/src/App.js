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
    this.logout = this.logout.bind(this)
  }


  logout() {
    const url = 'https://www.spotify.com/logout/'                                                                                                                                                                                                                                                                               
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                                                
    setTimeout(() => spotifyLogoutWindow.close(), 2000)
  }
  
  render() {

    return(
      <BrowserRouter>
        <Switch>
          <Route path="/recommendation" component={() => <RecommendationForm />}/>
          <Route path="/" component={() => <Homepage 
            
            user={this.state} exact
            logout={this.logout}
            />} 
          />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App;
