import { useState, useRef, useCallback } from 'react'
import { PLAYLISTS } from '../../config/playlistConfig'
import { usePlaylist } from '../../hooks/usePlaylist'
import SiteHeader from '../SiteHeader/SiteHeader'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import PlaylistSidebar from '../PlaylistSidebar/PlaylistSidebar'
import VideoGrid from '../VideoGrid/VideoGrid'
import './PlaylistsPage.css'

function PlaylistsPage() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const playerRef = useRef(null)

  const { videos, playlistInfo, loading, error, retry } =
    usePlaylist(selectedPlaylistId)

  const scrollToPlayer = useCallback(() => {
    requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const handleVideoSelect = useCallback((video) => {
    setActiveVideo(video)
    scrollToPlayer()
  }, [scrollToPlayer])

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylistId(playlistId)
    setActiveVideo(null)
  }

  return (
    <div className="playlists-page">
      <SiteHeader />

      <section className="playlists-page__list-section">
        <h2 className="playlists-page__heading">Playlists</h2>
        <ul className="playlists-page__list">
          {PLAYLISTS.map((pl) => (
            <li key={pl.id}>
              <button
                type="button"
                className={`playlists-page__item${
                  selectedPlaylistId === pl.id ? ' playlists-page__item--active' : ''
                }`}
                onClick={() => handlePlaylistSelect(pl.id)}
              >
                <span className="playlists-page__icon">📋</span>
                <span className="playlists-page__name">{pl.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div ref={playerRef} className="playlists-page__player-section">
        {activeVideo ? (
          <div className="playlists-page__player-layout">
            <VideoPlayer video={activeVideo} />
            {videos.length > 0 && (
              <PlaylistSidebar
                videos={videos}
                activeVideoId={activeVideo.id}
                onVideoSelect={handleVideoSelect}
              />
            )}
          </div>
        ) : (
          <div className="playlists-page__placeholder">
            <span className="playlists-page__placeholder-icon">▶</span>
            <p>Playlist select karein aur video choose karein</p>
          </div>
        )}
      </div>

      {selectedPlaylistId && loading && (
        <div className="playlists-page__state playlists-page__loading">
          <div className="playlists-page__spinner" />
          <p>Playlist videos load ho rahi hain...</p>
        </div>
      )}

      {selectedPlaylistId && error && !loading && (
        <div className="playlists-page__state playlists-page__error">
          <span className="playlists-page__error-icon">⚠</span>
          <p>{error}</p>
          <button className="playlists-page__retry-btn" onClick={retry}>
            Try Again
          </button>
        </div>
      )}

      {selectedPlaylistId && !loading && !error && (
        <>
          <section className="playlists-page__info">
            {playlistInfo?.thumbnail && (
              <img
                className="playlists-page__thumb"
                src={playlistInfo.thumbnail}
                alt=""
              />
            )}
            <div>
              <h2 className="playlists-page__title">
                {playlistInfo?.title || 'Playlist'}
              </h2>
              <p className="playlists-page__meta">
                <span className="playlists-page__count">
                  {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                </span>
              </p>
            </div>
          </section>

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

export default PlaylistsPage
