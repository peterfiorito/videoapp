import React from 'react'
import { Player, BigPlayButton } from 'video-react';

const videoPlayer = props => (
  <div>
    <Player
      playsInline
      src={props.url}>
      <BigPlayButton position="center" />
      </Player>
  </div>
)

export default videoPlayer
