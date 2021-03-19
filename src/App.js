import {useState} from 'react'
import './App.scss'
import VideoItem from './components/VideoItem/VideoItem'



const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [openedSettings, setOpenedSettings] = useState(false) 


  return(
    <div className='main-screen'> 
      <h1 className='title'>Custom Video Player</h1>
      <VideoItem/>
    </div>
  )
}


export default App