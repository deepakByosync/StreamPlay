import { formatDuration } from '../../utils/formatDuration'
import './PlaylistSidebar.css'

function PlaylistSidebar({ videos, activeVideoId, onVideoSelect }) {
  return (
    <aside className="playlist-sidebar">
      <div className="playlist-sidebar__header">
        <h3 className="playlist-sidebar__title">Up Next</h3>
        <span className="playlist-sidebar__count">{videos.length} videos</span>
      </div>
      <ul className="playlist-sidebar__list">
        {videos.map((video) => {
          const isActive = video.id === activeVideoId
          const duration = formatDuration(video.duration)

          return (
            <li key={video.id}>
              <button
                className={`playlist-sidebar__item ${isActive ? 'playlist-sidebar__item--active' : ''}`}
                onClick={() => onVideoSelect(video)}
                aria-current={isActive ? 'true' : undefined}
              >
                <div className="playlist-sidebar__thumb-wrap">
                  <img
                    className="playlist-sidebar__thumb"
                    src={video.thumbnail}
                    alt=""
                    loading="lazy"
                  />
                  {duration && (
                    <span className="playlist-sidebar__duration">{duration}</span>
                  )}
                  {isActive && (
                    <span className="playlist-sidebar__playing">
                      <span className="playlist-sidebar__bar" />
                      <span className="playlist-sidebar__bar" />
                      <span className="playlist-sidebar__bar" />
                    </span>
                  )}
                </div>
                <div className="playlist-sidebar__info">
                  <span className="playlist-sidebar__index">{video.position}</span>
                  <p className="playlist-sidebar__video-title">{video.title}</p>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default PlaylistSidebar
