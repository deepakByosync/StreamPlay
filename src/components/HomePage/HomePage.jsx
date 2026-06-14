import { useState, useRef, useCallback } from 'react'
import { STATIC_VIDEO } from '../../config/playlistConfig'
import { extractYouTubeVideoId } from '../../utils/extractVideoId'
import SiteHeader from '../SiteHeader/SiteHeader'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import './HomePage.css'

function HomePage() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [videoLink, setVideoLink] = useState('')
  const [linkError, setLinkError] = useState(null)
  const playerRef = useRef(null)

  const scrollToPlayer = useCallback(() => {
    requestAnimationFrame(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const handleStaticVideo = () => {
    setActiveVideo(STATIC_VIDEO)
    scrollToPlayer()
  }

  const handleLinkSubmit = (e) => {
    e.preventDefault()
    setLinkError(null)

    const videoId = extractYouTubeVideoId(videoLink)
    if (!videoId) {
      setLinkError('Valid YouTube video link ya video ID daalein.')
      return
    }

    setActiveVideo({ id: videoId, title: 'YouTube Video' })
    scrollToPlayer()
  }

  return (
    <div className="homepage">
      <SiteHeader
        actions={
          <button
            type="button"
            className="homepage__static-btn"
            onClick={handleStaticVideo}
          >
            ▶ Featured Video
          </button>
        }
      />

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
            disabled={!videoLink.trim()}
          >
            Play
          </button>
        </form>
        {linkError && <p className="homepage__link-error">{linkError}</p>}
      </section>

      <div ref={playerRef} className="homepage__player-section">
        {activeVideo ? (
          <div className="homepage__player-wrap">
            <VideoPlayer video={activeVideo} />
          </div>
        ) : (
          <div className="homepage__player-placeholder">
            <span className="homepage__placeholder-icon">▶</span>
            <p>Video link daalein ya Featured Video play karein</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
