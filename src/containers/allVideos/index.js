import React from 'react'

class AllVideos extends React.Component {
  changeVid(payload){
    this.props.vidchange(payload)
  }
  render(){
  let videoList = this.props.videos.map((video)=>{
    return <li className="video-list__item" key={video.id}> 
            {video.id}, {video.name}
          <button
            className="video-list__button"
            onClick={this.changeVid.bind(this,video.url)}>
            <span className="video-list__button--text">
              Play
              <em className="fas fa-play"/>
            </span>
          </button>
          </li>
  })
  return (<div>
    <h4>Playlist</h4>
    <ul className="video-list">{videoList}</ul>
  </div>)
  }
}
export default AllVideos
