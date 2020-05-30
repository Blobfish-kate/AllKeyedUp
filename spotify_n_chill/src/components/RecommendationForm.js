import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'

import FoundSong from './FoundSong';
import Results from './Results'

const spotifyApi = new SpotifyWebApi()

class RecommendationForm extends React.Component {
  constructor() {
    super()
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      token: params.access_token,
      genres: null,
      keyList: {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'Bb': 10, 'B': 11},
      mode: {'major': 1, 'minor': 0},
      keySelection: "",
      genreSelection: "",
      timeSelection: 0,
      recommendedSongs: null
    }
    if (params.access_token){
      spotifyApi.setAccessToken(params.access_token)
    }

    this.getRecommendations = this.getRecommendations.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.backButton = this.backButton.bind(this)
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

  getRecommendations() {
    let genre = this.state.genreSelection
    let key = this.state.keyList[this.state.keySelection.substring(0, this.state.keySelection.indexOf('m')-1)]
    let mode = this.state.mode[this.state.keySelection.substring(this.state.keySelection.indexOf('m'), this.state.keySelection.length)]
    let time = parseInt(this.state.timeSelection)
    console.log("Key: " + key)
    console.log("Mode: " + mode)
    spotifyApi.getRecommendations({
      seed_genres: genre, 
      min_key: key, 
      max_key: key, 
      min_mode: mode, 
      max_mode: mode,
      min_time_signature: time,
      max_time_signature: time,
      target_popularity: 100
    })
      .then((data) => {
        console.log(data)
        this.setState({
          recommendedSongs: data.tracks
        })
      })
  }
  

  handleChange(e) {
    const {name, value} = e.target
    this.setState({[name] : value})
  }

  backButton() {
    this.setState({
      recommendedSongs: null
    })
  }
  
  render() {

    const genres = this.state.genres ? this.state.genres.map(item => <option>{item}</option>) : null
    const majorKeys = Object.keys(this.state.keyList).map(item => <option>{item} major</option>)
    const minorKeys = Object.keys(this.state.keyList).map(item => <option>{item} minor</option>)
    const timeSignatures = Array.from({length: 8}, (v, k) => k+1).map(item => <option>{item}</option>)
    const recommendedSongs = this.state.recommendedSongs ? this.state.recommendedSongs.map((item) => 
        <FoundSong song={item} />    ) : null

    

    const ResultsContainer = styled.div`
      
    `
    const FormContainer = styled.div`
      padding-top: 10px;
      margin-top: 20%;
      background-color: white;
      text-align: center;
      width: 60vw;
      background-color: whitesmoke
    `
    const H2 = styled.h2`
      color: black
    `
    return(
      
      <div>
        <h1>All Keyed Up</h1>
        <div style={{display: this.state.recommendedSongs && "none"}} >
          <FormContainer className="jumbotron">
            <div>
              <H2>Choose your favourite genre and key...</H2>
              <label>Choose a Genre (<strong>required</strong>): </label>
              <select onChange={this.handleChange} id="genreSelection" name="genreSelection" value={this.state.genreSelection} required>
                <option>--Select genre--</option>
                {genres}
              </select>
              <br />
              <label>Choose a Key: </label>
              <select onChange={this.handleChange} id="trackKey" name="keySelection" value={this.state.keySelection}>
                <option>--Select key--</option>
                {majorKeys}
                {minorKeys}
              </select>
              <br />
              <label>Choose a Time Signature: </label>
              <select onChange={this.handleChange} id="timeSelection" type="number" name="timeSelection" value={this.state.timeSelection}>
                <option>--Select beats/bar--</option>
                {timeSignatures}
              </select>
              <span style={{display: !this.state.timeSelection && "none"}}>beats per bar</span>
            </div>
            <button className="btn btn-light" onClick={this.getRecommendations}>Get recommendations</button>
          </FormContainer>
        </div>


        <ResultsContainer style={{display: !this.state.recommendedSongs && "none"}}>
          <Results 
            recommendedSongs={recommendedSongs} 
            keySelection={this.state.keySelection}
            genreSelection={this.state.genreSelection}
            backButton = {this.backButton}  
          />
        </ResultsContainer>
      </div>
    )
  }

}

export default RecommendationForm;
