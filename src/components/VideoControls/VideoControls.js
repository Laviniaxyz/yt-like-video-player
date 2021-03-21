import React from 'react'
import './VideoControls.scss'

import PlayArrow from '@material-ui/icons/PlayArrow'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Settings from '@material-ui/icons/Settings'
import Fullscreen from '@material-ui/icons/Fullscreen'
import Pause from '@material-ui/icons/Pause'
import LinearProgress from '@material-ui/core/LinearProgress';




//Work in progress, how do I get input value from material UI Linear Component
const setCurrentValue = () => {
console.log(progressRef.current.getAttribute('value'), 'currentValue') 

}

const changeVolume = () => {
videoRef.current.volume = progressRef.current.value
}


const VideoControls = () => {



  const toggleFullScreen =  () => {
    videoRef.current.requestFullscreen()
  } 
    //Toggle playback speed tab
    const toggleSpeedNav = () => {
      setOpenedSettings(!openedSettings)
    }
  
    const toggleVolume = () => {
      setIsMuted(!isMuted)
      if (videoRef.current.volume === 1) {
          videoRef.current.volume = 0.5
          setProgressVolume(0)
      } else {
        videoRef.current.volume = 1
        setProgressVolume(100)
      }
    }
  return (
    <div className='video-controls'>
    <div className='controls-left'>
    {isPlaying? <div onClick={togglePlay} className='volume'><Pause/></div> : <div onClick={togglePlay}><PlayArrow/></div>}
    {isMuted? <div onClick = {toggleVolume}><VolumeOffIcon/></div>:  
      <div onClick = {toggleVolume} className='volume'><VolumeUp/></div>
    }
     <div className='volumeProgress'><LinearProgress variant="determinate" value={progressVolume}/></div>
     <div className='volumeProgress'><input ref={progressRef} type="range" onChange={changeVolume} step="0.05" min="0" max="1" value='1'/></div>
    </div>
    <div className='controls-right'>
      <div onClick={toggleSpeedNav}><Settings/></div>
      <div onClick={toggleFullScreen}><Fullscreen/></div>
    </div>
  </div>
  )
}

export default VideoControls
