import { useState, useRef, useCallback } from 'react'
import { PLAYLISTS, DEFAULT_PLAYLIST_ID, YOUTUBE_API_KEY } from '../../config/playlistConfig'
import { usePlaylist } from '../../hooks/usePlaylist'
import { fetchVideoInfo } from '../../services/youtubeApi'
import { extractYouTubeVideoId } from '../../utils/extractVideoId'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import PlaylistSidebar from '../PlaylistSidebar/PlaylistSidebar'
import VideoGrid from '../VideoGrid/VideoGrid'
import './HomePage.css'

function HomePage() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(DEFAULT_PLAYLIST_ID)
  const [activeVideo, setActiveVideo] = useState(null)
  const [videoLink, setVideoLink] = useState('')
  const [linkLoading, setLinkLoading] = useState(false)
  const [linkError, setLinkError] = useState(null)
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

  const handleLinkSubmit = async (e) => {
    e.preventDefault()
    setLinkError(null)

    const videoId = extractYouTubeVideoId(videoLink)
    if (!videoId) {
      setLinkError('Valid YouTube video link ya video ID daalein.')
      return
    }

    if (!YOUTUBE_API_KEY) {
      setLinkError('YouTube API key missing. .env mein VITE_YOUTUBE_API_KEY add karein.')
      return
    }

    setLinkLoading(true)
    try {
      const video = await fetchVideoInfo(videoId, YOUTUBE_API_KEY)
      setActiveVideo(video)
      scrollToPlayer()
    } catch (err) {
      setLinkError(err.message || 'Video load nahi ho payi.')
    } finally {
      setLinkLoading(false)
    }
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
      </header>

      <section className="homepage__link-section">
        <form className="homepage__link-form" onSubmit={handleLinkSubmit}>
          <input
            type="text"
            className="homepage__link-input"
            placeholder="YouTube video link paste karein..."
            value={videoLink}
            onChange={(e) => {
              setVideoLink(e.target.value)
              if (linkError) setLinkError(null)
            }}
          />
          <button
            type="submit"
            className="homepage__link-btn"
            disabled={linkLoading || !videoLink.trim()}
          >
            {linkLoading ? 'Loading...' : 'Play'}
          </button>
        </form>
        {linkError && <p className="homepage__link-error">{linkError}</p>}
      </section>

      <section className="homepage__playlists-section">
        <h2 className="homepage__playlists-heading">Playlists</h2>
        <ul className="homepage__playlist-list">
          {PLAYLISTS.map((pl) => (
            <li key={pl.id}>
              <button
                type="button"
                className={`homepage__playlist-item${
                  selectedPlaylistId === pl.id ? ' homepage__playlist-item--active' : ''
                }`}
                onClick={() => handlePlaylistSelect(pl.id)}
              >
                <span className="homepage__playlist-icon">📋</span>
                <span className="homepage__playlist-name">{pl.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div ref={playerRef} className="homepage__player-section">
        {activeVideo ? (
          <div className="homepage__player-layout">
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
          <div className="homepage__player-placeholder">
            <span className="homepage__placeholder-icon">▶</span>
            <p>Video link daalein ya playlist se video select karein</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="homepage__state homepage__loading">
          <div className="homepage__spinner" />
          <p>Playlist videos load ho rahi hain...</p>
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
