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
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Settings from '@material-ui/icons/Settings'
import Fullscreen from '@material-ui/icons/Fullscreen'
import Pause from '@material-ui/icons/Pause'
import LinearProgress from '@material-ui/core/LinearProgress';



const VideoItem = ({isPlaying, setIsPlaying, isMuted, setIsMuted, openedSettings, setOpenedSettings}) => {
  
  const videoRef = useRef(null)
  const progressRef = useRef()
  const [progress, setProgress] = useState(0)
  const [progressVolume, setProgressVolume] = useState(100)
  const [timestamp, setTimestamp] = useState('00:00')

  
  

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

  const toggleVolume = () => {
    setIsMuted(!isMuted)
    if (videoRef.current.volume === 1) {
        videoRef.current.volume = 0
        setProgressVolume(0)
    } else {
      videoRef.current.volume = 1
      setProgressVolume(100)
    }
  }

  useEffect(()=> {
    //Displaying progress and timestamp
    if (isPlaying) {
      
      const timer = setInterval(()=> {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) *100)
         console.log(videoRef.current.currentTime, 'currTme')

         //Calculate timestamp
         let minutes = Math.floor(videoRef.current.currentTime / 60);
          if (minutes <10) {
            minutes = '0' + String(minutes);
          }

          let seconds = Math.floor(videoRef.current.currentTime%60);
          if (seconds < 10) {
            seconds = '0' + String(seconds);
          }
          setTimestamp(`${minutes}:${seconds}`)
      }, [500])
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, isPlaying])

  const setCurrentValue = () => {
    console.log(progressRef.current.getAttribute('value'), 'currentValue') 
    
  }

  const toggleFullScreen =  () => {
    videoRef.current.requestFullscreen()
  } 

  

  return(
      <div className='vp-container'>
        {/* VIDEO */}
        <div className='video' >
          <Card onClick={togglePlay}>
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
          <div>{timestamp}</div>
          <Box display="flex" alignItems="center">
            <Box width="100%"  mr={1}>
              <LinearProgress
                onClick={setCurrentValue}
                ref={progressRef} 
                variant="determinate"
                value={progress} 
                />
            </Box>
          </Box>
        </div>
        {/* CONTROLS */}
        <div className='video-controls'>
          <div className='controls-left'>
          {isPlaying? <div onClick={togglePlay} className='volume'><Pause/></div> : <div onClick={togglePlay}><PlayArrow/></div>}
          {isMuted? <div onClick = {toggleVolume}><VolumeOffIcon/></div>:  
            <div onClick = {toggleVolume} className='volume'><VolumeUp/></div>
          }
           <div className='volumeProgress'><LinearProgress variant="determinate" value={progressVolume}/></div>
          </div>
          <div className='controls-right'>
            <div onClick={toggleSpeedNav}><Settings/></div>
            <div onClick={toggleFullScreen}><Fullscreen/></div>
          </div>
        </div>
      </div>
  )
}

export default VideoItem