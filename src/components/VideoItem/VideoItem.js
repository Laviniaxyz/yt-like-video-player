import {useRef, useState, useEffect} from 'react'
import './VideoItem.scss'

import VideoKamua from '../../video/Kamua.mp4'
import PlayImage from '../../images/play_arrow_white.svg'
import PauseImage from '../../images/pause_white.svg'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';


import PlayArrow from '@material-ui/icons/PlayArrow'
import VolumeUp from '@material-ui/icons/VolumeUp'
import Settings from '@material-ui/icons/Settings'
import Fullscreen from '@material-ui/icons/Fullscreen'
import Pause from '@material-ui/icons/Pause'
import LinearProgress from '@material-ui/core/LinearProgress';



const VideoItem = ({isPlaying, setIsPlaying, isMuted, openedSettings, setOpenedSettings}) => {
  
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  
  

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleSpeedNav = () => {
    setOpenedSettings(!openedSettings)
  }

  useEffect(()=> {
    if (isPlaying) {
      const timer = setInterval(()=> {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) *100)
         console.log(videoRef.current.currentTime, 'currTme')
      }, [500])
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, isPlaying])
  
 

  return(
      <div className='vp-container'>
        {/* VIDEO */}
        <div className='video'  onClick={togglePlay}>
          <Card>
            <CardActionArea>
              <CardMedia 
                ref={videoRef}
                component="video"
                autoPlay 
                loop 
                type='video/mp4' 
                src={VideoKamua}
                />
            </CardActionArea>
          </Card>
          <div className='image'>
           {isPlaying? <img src={PauseImage}/> : <img src={PlayImage}/>}
          </div>
          {openedSettings?
          (
            <div className='speed'>
            <div className='speed-title'>Playback Speed</div>
            <div>0.5</div>
            <div>0.75</div>
            <div>Normal</div>
            <div>1.25</div>
            <div>1.5</div>
          </div>
          )
        :
        null }
        </div>
        {/* PROGRESS BAR */}
        <div className='progress-bar'>
        <Box display="flex" alignItems="center">
          <Box width="100%"  mr={1}>
            <LinearProgress 
              variant="determinate"
              value={progress} 
              />

          </Box>
        </Box>
        </div>
        {/* CONTROLS */}
        <div className='video-controls'>
          <div className='controls-left'>
          {isPlaying? <div onClick={togglePlay}><Pause/></div> : <div onClick={togglePlay}><PlayArrow/></div>}
          <div><VolumeUp/></div>
          </div>
          <div className='controls-right'>
            <div><Settings onClick={toggleSpeedNav}/></div>
            <div><Fullscreen/></div>
          </div>
        </div>
      </div>
  )
}

export default VideoItem