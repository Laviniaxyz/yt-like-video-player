import {useRef, useState, useEffect, useContext} from 'react'
import './VideoItem.scss'

import VideoKamua from '../../video/Kamua.mp4'
import PlayImage from '../../images/play_arrow_white.svg'
import PauseImage from '../../images/pause_white.svg'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import PlayArrow from '@material-ui/icons/PlayArrow'
import VolumeUp from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Settings from '@material-ui/icons/Settings'
import Fullscreen from '@material-ui/icons/Fullscreen'
import Pause from '@material-ui/icons/Pause'

import {StoreContext} from '../../App.js'
import {useObserver} from 'mobx-react'

const VideoItem = ({isMuted, setIsMuted, openedSettings, setOpenedSettings}) => {
  const store = useContext(StoreContext)

  const videoRef = useRef(null)
  const volumeProgressRef = useRef()
  const videoProgressRef = useRef()
 

  const [progress, setProgress] = useState(0)
  const [progressVolume, setProgressVolume] = useState(1)
  const [timestamp, setTimestamp] = useState('00:00')
  const [animation, setAnimation] = useState(false)  
  const [showControls, setShowControls] = useState(true)
  const [mouseMoved, setMouseMoved] = useState(false)

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      store.setIsPlaying(true)
    } else {
      videoRef.current.pause()
      store.setIsPlaying(false)
    }
  }

  //Display animation on video play/stop
  useEffect(() => {
    setAnimation(true)
    const timer =  setTimeout(() => {
      setAnimation(false)
    }, 600);
    
    return () => { clearTimeout(timer)}
  }, [store.isPlaying])

  //Toggle the appearance of playback speed tab
  const toggleSpeedNav = () => {
    setOpenedSettings(!openedSettings)
  }

  const changePlaybackSpeed = (num) => {
    videoRef.current.playbackRate = num
    setOpenedSettings(false)
  }


  //Managing volume
  const toggleVolume = () => {
    setIsMuted(!isMuted)
    if (videoRef.current.volume ===  1) {
      videoRef.current.volume = 0
    } else {
      videoRef.current.volume = 1
    }
  }

  const changeVolume = () => {
    toggleControls()
    setProgressVolume(volumeProgressRef.current.value)
    videoRef.current.volume = volumeProgressRef.current.value
    if (videoRef.current.volume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  //Dstore.isPlaying progress and timestamp
  useEffect(()=> {
    if (store.isPlaying) { 
      const timer = setInterval(()=> {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) *100)
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
  }, [progress, store.isPlaying])


  const setVideoProgress = () => {
    toggleControls()
    setProgress(videoProgressRef.current.value)
    videoRef.current.currentTime = (videoProgressRef.current.value * videoRef.current.duration)/100
  }

  // Show/Hide controls based on mousemove
  const toggleControls = () => {
    setMouseMoved(true)
    setShowControls(true)
  }

  useEffect(() => {
    setMouseMoved(false)
    const timer =  setTimeout(() => {
      setShowControls(false)
    }, 4000);
    
    return () => { clearTimeout(timer)}
  }, [mouseMoved])

    const toggleFullScreen =  () => {
    videoRef.current.requestFullscreen()
  } 

  return useObserver(() => (
      <div className='vp-container'  >
        {/* VIDEO */}
        <div className='video' onMouseMove={toggleControls} onClick={toggleControls}>
          <Card onClick={togglePlay} >
            <CardActionArea>
              <CardMedia 
                style={showControls? null : {cursor: 'none'}}
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
          <div className={animation? 'displayImage' : 'hideImage'}>
            {store.isPlaying? <img src={PlayImage}/>: <img src={PauseImage}/> }
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
        </div >
        {/* PROGRESS BAR */}
        <div className='progress-bar' onMouseOver={toggleControls} onClick={toggleControls}>
          <div><input ref={videoProgressRef} type="range" onChange={setVideoProgress} step="0.1" min="0" max="100" value={progress}/></div>
        </div>
        {/* CONTROLS */}
        { showControls?
        <div className='video-controls' onMouseOver={toggleControls} onClick={toggleControls}>
          <div className='controls-left'>
            {store.isPlaying? <div onClick={togglePlay} className='volume icon'><Pause/></div> : <div onClick={togglePlay} className='icon'><PlayArrow/></div>}
            {isMuted? <div onClick = {toggleVolume} className='icon'><VolumeOffIcon/></div>:  
              <div onClick = {toggleVolume} className='volume icon'><VolumeUp/></div>
            }
            <div className='volumeProgress'>
              <input ref={volumeProgressRef} type="range" onChange={changeVolume} step="0.05" min="0" max="1" value={progressVolume}/>
            </div>
          </div>
          <div className='controls-right'>
            <div onClick={toggleSpeedNav} className='icon'><Settings/></div>
            <div onClick={toggleFullScreen} className='icon'><Fullscreen/></div>
          </div>
        </div>
      : null
        }
      
      </div>
      
  ))
}

export default VideoItem