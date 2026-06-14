import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import PlaylistsPage from './components/PlaylistsPage/PlaylistsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
