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
  const volumeProgressRef = useRef()
  const videoProgressRef = useRef()
  const [progress, setProgress] = useState(0)
  const [progressVolume, setProgressVolume] = useState(1)
  const [timestamp, setTimestamp] = useState('00:00')
  const [animation, setAnimation] = useState(false)  


  const togglePlay = () => {
    setAnimation(true)

    setTimeout(() => {
      setAnimation(false)
    }, 1000);
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    
  }

  //Toggle playback speed tab
  const toggleSpeedNav = () => {
    setOpenedSettings(!openedSettings)
  }

  const toggleVolume = () => {
    setIsMuted(!isMuted)
    console.log(videoRef.current.volume, 'volume' )
    if (videoRef.current.volume ===  1) {
      videoRef.current.volume = 0
    } else {
      videoRef.current.volume = 1
    }
  }

  const changeVolume = () => {
    setProgressVolume(volumeProgressRef.current.value)
    videoRef.current.volume = volumeProgressRef.current.value
    if (videoRef.current.volume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }


  useEffect(()=> {
    //Displaying progress and timestamp
    if (isPlaying) {
    // console.log(videoRef.current.duration, 'duration')
     //console.log(videoRef.current.currentTime, 'currentTime')
      //console.log(volumeProgressRef.current.getAttribute('value'), 'currentValue') 
      const timer = setInterval(()=> {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) *100)
         //console.log(videoRef.current.currentTime, 'currTme')

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

    const toggleFullScreen =  () => {
      videoRef.current.requestFullscreen()
    } 


  const setVideoProgress = () => {
    console.log(videoProgressRef.current.value, 'progress value 2')
    
    console.log((videoProgressRef.current.value * videoRef.current.duration)/100, 'cuurent time changed')
    
    setProgress(videoProgressRef.current.value)
    videoRef.current.currentTime = (videoProgressRef.current.value * videoRef.current.duration)/100
  }


  const changePlaybackSpeed = (num) => {
    videoRef.current.playbackRate = num
    setOpenedSettings(false)
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
                //autoPlay 
                //loop 
                type='video/mp4' 
                src={VideoKamua}
                />
            </CardActionArea>
          </Card>
          <div className='timestamp'>{timestamp}</div>
          <div className={animation? 'image2' : 'image'}>
            {isPlaying? <img src={PlayImage}/>: <img src={PauseImage}/> }
          </div>

          {openedSettings?
          (
            <div className='speed'>
            <div className='speed-title'>Playback Speed</div>
            <div onClick={changePlaybackSpeed.bind(this, 0.5)}>0.5</div>
            <div onClick={changePlaybackSpeed.bind(this, 0.75)}>0.75</div>
            <div onClick={changePlaybackSpeed.bind(this, 1)}>Normal</div>
            <div onClick={changePlaybackSpeed.bind(this, 1.25)}>1.25</div>
            <div onClick={changePlaybackSpeed.bind(this, 1.5)}>1.5</div>
          </div>
          )
        :
        null }
         
        </div>
        {/* PROGRESS BAR */}
        <div className='progress-bar'>
          <div><input ref={videoProgressRef} type="range" onChange={setVideoProgress} step="0.1" min="0" max="100" value={progress}/></div>
        </div>
        {/* CONTROLS */}
        <div className='video-controls'>
          <div className='controls-left'>
          {isPlaying? <div onClick={togglePlay} className='volume'><Pause/></div> : <div onClick={togglePlay}><PlayArrow/></div>}
          {isMuted? <div onClick = {toggleVolume}><VolumeOffIcon/></div>:  
            <div onClick = {toggleVolume} className='volume'><VolumeUp/></div>
          }
          <div className='volumeProgress'><input ref={volumeProgressRef} type="range" onChange={changeVolume} step="0.05" min="0" max="1" value={progressVolume}/></div>
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