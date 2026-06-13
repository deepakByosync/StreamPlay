import { useState, useRef, useCallback } from 'react'
import { PLAYLISTS, DEFAULT_PLAYLIST_ID } from '../../config/playlistConfig'
import { usePlaylist } from '../../hooks/usePlaylist'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import PlaylistSidebar from '../PlaylistSidebar/PlaylistSidebar'
import VideoGrid from '../VideoGrid/VideoGrid'
import './HomePage.css'

function HomePage() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(DEFAULT_PLAYLIST_ID)
  const [activeVideo, setActiveVideo] = useState(null)
  const playerRef = useRef(null)

  const { videos, playlistInfo, loading, error, retry } =
    usePlaylist(selectedPlaylistId)

  const handleVideoSelect = useCallback((video) => {
    setActiveVideo(video)
    requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const handlePlaylistChange = (e) => {
    setSelectedPlaylistId(e.target.value)
    setActiveVideo(null)
  }

  return (
    <div className="homepage">
      <header className="homepage__header">
        <div className="homepage__brand">
          <span className="homepage__logo">▶</span>
          <div>
            <h1 className="homepage__site-title">StreamPlay</h1>
            <p className="homepage__site-subtitle">YouTube Playlist Viewer</p>
          </div>
        </div>

        <div className="homepage__controls">
          <label className="homepage__select-label" htmlFor="playlist-select">
            Playlist
          </label>
          <select
            id="playlist-select"
            className="homepage__select"
            value={selectedPlaylistId}
            onChange={handlePlaylistChange}
          >
            {PLAYLISTS.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && (
        <div className="homepage__state homepage__loading">
          <div className="homepage__spinner" />
          <p>Loading playlist videos...</p>
        </div>
      )}

      {error && !loading && (
        <div className="homepage__state homepage__error">
          <span className="homepage__error-icon">⚠</span>
          <p>{error}</p>
          <button className="homepage__retry-btn" onClick={retry}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="homepage__playlist-info">
            {playlistInfo?.thumbnail && (
              <img
                className="homepage__playlist-thumb"
                src={playlistInfo.thumbnail}
                alt=""
              />
            )}
            <div>
              <h2 className="homepage__playlist-title">
                {playlistInfo?.title || 'Playlist'}
              </h2>
              <p className="homepage__playlist-meta">
                <span className="homepage__video-count">
                  {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                </span>
              </p>
            </div>
          </section>

          <div ref={playerRef} className="homepage__player-section">
            {activeVideo ? (
              <div className="homepage__player-layout">
                <VideoPlayer video={activeVideo} />
                <PlaylistSidebar
                  videos={videos}
                  activeVideoId={activeVideo.id}
                  onVideoSelect={handleVideoSelect}
                />
              </div>
            ) : (
              <div className="homepage__player-placeholder">
                <span className="homepage__placeholder-icon">▶</span>
                <p>Select a video from the grid below to start watching</p>
              </div>
            )}
          </div>

          <VideoGrid
            videos={videos}
            activeVideoId={activeVideo?.id}
            onVideoSelect={handleVideoSelect}
          />
        </>
      )}
    </div>
  )
}

export default HomePage
