import { formatDuration } from '../../utils/formatDuration'
import './VideoCard.css'

function VideoCard({ video, isActive, onClick }) {
  const duration = formatDuration(video.duration)

  return (
    <article
      className={`video-card ${isActive ? 'video-card--active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Play ${video.title}`}
    >
      <div className="video-card__thumbnail-wrap">
        <img
          className="video-card__thumbnail"
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
        />
        {duration && (
          <span className="video-card__duration">{duration}</span>
        )}
        {isActive && (
          <span className="video-card__playing-badge">Now Playing</span>
        )}
        <div className="video-card__overlay">
          <span className="video-card__play-icon">▶</span>
        </div>
      </div>
      <div className="video-card__info">
        <span className="video-card__position">#{video.position}</span>
        <h3 className="video-card__title">{video.title}</h3>
      </div>
    </article>
  )
}

export default VideoCard
