import {useState, createContext} from 'react'
import './App.scss'
import VideoItem from './components/VideoItem/VideoItem'
import {useLocalStore, useObserver} from 'mobx-react'

//Example - handling data with MobX for the 1st time
export const StoreContext = createContext()

const StoreProvider = ({children}) => {
  const store = useLocalStore(() => ({
    isPlaying: false,
    setIsPlaying: (bool) => store.isPlaying = bool
  }))

  return(
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}


const App = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [openedSettings, setOpenedSettings] = useState(false) 

  return(
    <div className='main-screen'> 
      <h1 className='title'>Custom Video Player</h1>
      <StoreProvider>
      <VideoItem  isMuted={isMuted} openedSettings={openedSettings} setOpenedSettings={setOpenedSettings} setIsMuted={setIsMuted}/>
      </StoreProvider>
    </div>
  )
}


export default App