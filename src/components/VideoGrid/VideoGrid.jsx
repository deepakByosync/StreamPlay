import VideoCard from '../VideoCard/VideoCard'
import './VideoGrid.css'

function VideoGrid({ videos, activeVideoId, onVideoSelect }) {
  if (videos.length === 0) return null

  return (
    <section className="video-grid-section">
      <div className="video-grid-header">
        <h2 className="video-grid-title">All Videos</h2>
        <span className="video-grid-count">{videos.length} videos</span>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={video.id === activeVideoId}
            onClick={() => onVideoSelect(video)}
          />
        ))}
      </div>
    </section>
  )
}

export default VideoGrid
