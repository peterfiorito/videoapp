import React from 'react'
import AllVideos from '../allVideos'
import { Player, BigPlayButton } from 'video-react';

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      route: '',
      videoHistory: [],
      videoName: '',
      artistName: '',
      lastRoute: '',
      ended: false,
      hasError: false
    }
    this.updateVidData = this.updateVidData.bind(this);
  }
  addVideo() {
    // replace state with full new object
    let temp = this.state.videoHistory.slice()
    // quick checkup, avoid dups on videoname, as id is used for tracking
    let check = this.avoidDuplicateVideoName(temp)
    // if check comes positive, debounce and avoid saving video to list
    if (check) {
      this.setState(() =>({
        hasError: true
      }))
      return
    }
    // if name is not duplicated, continue with pushing video to the playlist
    this.setState(() =>({ hasError: false }))
    temp.push({id: this.state.videoName, name: this.state.artistName, url: this.state.lastRoute})
    // And reset state to empty
    this.setState(() =>({
      videoHistory: temp,
      artistName: '',
      videoName: '',
      lastRoute:''
    }))
  }
  avoidDuplicateVideoName(array) {
    /* checks the provided array, by mapping it's items ids
      (video name) and checking if the name is already used */
    let copy = array.map((x)=>{return x.id})
    let checkId = copy.indexOf(this.state.videoName)
    let error
    if(checkId !== -1){
      error = true
    }
    return error
  }
  updateVidData(event){
    let update = event.target.value
    let name = event.target.name;
    if(name === 'route'){
      this.setState(()=>({
        lastRoute: update
      }))}
    this.setState(()=>({
      [name]: update
    }))
  }
  updateFromPlaylist(video) {
    this.setState(()=>({
      route: video
    }))
  }
  handleStateChange(state) {
    /* registered on component Mount. Handle state changes
      if the current video has ended, call continues playing */
    this.setState({player: state, ended: state.ended})
    if(this.state.ended){
      this.continousPlaying()
    }
  }
  computeUrls(){
    if(this.state.videoHistory.length < 1){
      return this.state.route
    }
    let len = this.state.videoHistory.length - 1
    return this.state.videoHistory[len].url
  }
  continousPlaying() {
    let copyPlaylist = this.state.videoHistory.slice()
    if(copyPlaylist.length < 2){
      return
    }
    // Map current playlist videos url and get current position
    let urls = copyPlaylist.map((x)=>{return x.url})
    let tracker = urls.indexOf(this.state.route)
    // Determine next video index, get it's url and play it
    let nextVid
    (tracker + 1) < copyPlaylist.length ? nextVid = tracker + 1 : nextVid = 0
    this.setState({route: copyPlaylist[nextVid].url, ended: false})
    this.refs.player.play()
  }
  componentDidMount() {
    // suscribe to player state changes
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this))
  }
  render(){
  return (<div>
    {/* Add your video inputs */}
    <div className="add-video">
      <h1 className="app-title">Add videos to your playlist</h1>
      <div className="add-video__row">
        <div className="add-video__column">
          <label className="add-video__label" htmlFor="route">Video file</label>
          <input type="url" name="route" value={this.state.lastRoute} onChange={this.updateVidData.bind(this)}/>
        </div>
        <div className="add-video__column">
          <label className="add-video__label" htmlFor="artistname">Artist name</label>
          <input
            type="text" 
            id="artistname" 
            name="artistName" 
            value={this.state.artistName} 
            onChange={this.updateVidData.bind(this)}/>
        </div>
        <div className="add-video__column">
          <label className="add-video__label" htmlFor="videoname">Video name</label>
          <input
            type="text" 
            name="videoName" 
            id="videoname"
            value={this.state.videoName}
            className={this.state.hasError ? 'error-field' : null}
            onChange={this.updateVidData.bind(this)}/>
          {this.state.hasError && <span className="error">Avoid duplicate names!</span>}
        </div>
        <button
          className="add-btn"
          onClick={() => {this.addVideo()}}>
          <span>Add Video!</span>
        </button>
      </div>
    </div>
    {/* Player and playlist block */}
    <div className="wrapper">
      <div className="player">
        <Player
          ref="player"
          playsInline
          autoPlay
          src={this.state.route}>
          <BigPlayButton position="center" />
        </Player>
      </div>
      <div className="playlist">
        <AllVideos videos={this.state.videoHistory} vidchange = {this.updateFromPlaylist.bind(this)}/>
      </div>
    </div>
    {/* Player and playlist end block */}
  </div>)
  }
}
export default Home
