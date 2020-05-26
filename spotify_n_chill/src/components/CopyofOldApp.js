import React from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'

import Player from './components/Player'

const spotifyApi = new SpotifyWebApi()

class App extends React.Component {
  constructor() {
    super()
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      token: params.access_token,
      nowPlaying: {
        name: "Not Checked",
        image: ""
      },
      searchTerm: "",
      foundSongList: [],
      myTopTracks: [],
      genres: null,
      keyList: {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'Bb': 10, 'B': 11},
      mode: {'major': 1, 'minor': 0},
      keySelection: "",
      genreSelection: "",
      minLength: null,
      maxLength: null,
      recommendedSongs: null
    }
    if (params.access_token){
      spotifyApi.setAccessToken(params.access_token)
    }


    this.getNowPlaying = this.getNowPlaying.bind(this)
    this.getTopTracks = this.getTopTracks.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  componentDidMount() {
    spotifyApi.getAvailableGenreSeeds()
      .then((data) => {
        this.setState({
          genres: data.genres
        })
      })
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getTopTracks() {
    spotifyApi.getMyTopTracks()
      .then((data) => {
        this.setState({
          myTopTracks: data.items
        })
      },
      function(err) {
        console.log(err)
      }
      )
  }

  getRecommendations() {
    let genre = this.state.genreSelection
    let key = this.state.keyList[this.state.keySelection.substring(0, this.state.keySelection.indexOf('m')-1)]
    let mode = this.state.mode[this.state.keySelection.substring(this.state.keySelection.indexOf('m'), this.state.keySelection.length)]
    console.log("Key: " + key)
    console.log("Mode: " + mode)
    spotifyApi.getRecommendations({seed_genres: genre, min_key: key, max_key: key, min_mode: mode, max_mode: mode})
      .then((data) => {
        console.log(data)
        this.setState({
          recommendedSongs: data.tracks
        })
      })
  }
  

  searchForSong(e){
    this.setState({
      searchTerm: e.target.value
    })
    spotifyApi.searchTracks(this.state.searchTerm, {limit: 50})
    .then(
      data => {
        this.setState({
          foundSongList: data.tracks.items
        })
      },
      function(err) {
        console.log(err)
      }
    )
  }

  handleChange(e) {
    const {name, value} = e.target
    this.setState({[name] : value})
  }
  
  render() {

    const foundSongs = this.state.foundSongList.map(item => <li>{item.name}</li>)
    const genres = this.state.genres ? this.state.genres.map(item => <option>{item}</option>) : null

    const majorKeys = Object.keys(this.state.keyList).map(item => <option>{item} major</option>)
    const minorKeys = Object.keys(this.state.keyList).map(item => <option>{item} minor</option>)

    const recommendedSongs = this.state.recommendedSongs ? this.state.recommendedSongs.map(
    (item) => <li>{item.name}, {item.artists[0].name}</li>
    ) : null

    return(
      <div className="App">
        <a href="http://localhost:8888">
          <button>Login With Spotify</button>
        </a>
        
        <label>Search for a song: </label>
        <input onChange={(e) => this.searchForSong(e)} type='text' placeholder='enter search term here' name="searchTerm"/>
        <div>
          <ol>{foundSongs}</ol>
        </div>

        <button onClick={() => this.getRecommendations()}>See recommendations</button>
        
        <div>
          <label>Choose a Key: </label>
          <select onChange={this.handleChange} id="trackKey" name="keySelection" value={this.state.keySelection}>
            <option>--Select one--</option>
            {majorKeys}
            {minorKeys}
          </select>
          <br />
          <label>Choose a Genre:</label>
          <select onChange={this.handleChange} id="genreSelection" name="genreSelection" value={this.state.genreSelection}>
            <option>--Select one--</option>
            {genres}
          </select>
          <br />
          <label>Choose a Song Length: </label>
          <div>
            from: <input type="time"/>
            <br />
            to: <input type='time' />
          </div>
        </div>
        <button onClick={this.getRecommendations}>Get recommendations</button>
        <div>{recommendedSongs}</div>

        {this.state.token && this.state.recommendedSongs && (
          <Player 
            item={this.state.recommendedSongs[0]}
          />
        )}
      </div>
    )
  }

}

export default App;
