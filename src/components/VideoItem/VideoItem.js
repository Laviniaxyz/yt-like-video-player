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



const VideoItem = ({isPlayling, isMuted, openedSettings}) => {

  return(
      <div className='vp-container'>
        <div className='video'>
          <Card>
            <CardActionArea>
              <CardMedia 
                component="video"
                autoPlay 
                loop 
                type='video/mp4' 
                src={VideoKamua}
                />
            </CardActionArea>
          </Card>
          <div className='image'>
            <img src={PlayImage}/>
          </div>
          <div className='speed'>
            <div className='speed-title'>Playback Speed</div>
            <div>0.5</div>
            <div>0.75</div>
            <div>Normal</div>
            <div>1.25</div>
            <div>1.5</div>
          </div>
        </div>
        <div className='progress-bar'>
        <Box display="flex" alignItems="center">
          <Box width="60%" mr={1}>
            <LinearProgress variant="determinate"  />
          </Box>
        </Box>
        </div>
        <div className='video-controls'>
          <div className='controls-left'>
          {isPlayling? <div><PlayArrow/></div>: <div><Pause/></div>}
          <div><VolumeUp/></div>
          </div>
          <div className='controls-right'>
            <div><Settings /></div>
            <div><Fullscreen/></div>
          </div>
        </div>
      </div>
  )
}

export default VideoItem