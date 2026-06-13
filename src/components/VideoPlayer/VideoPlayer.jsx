import './VideoPlayer.css'

function VideoPlayer({ video }) {
  if (!video) return null

  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`

  return (
    <section className="video-player">
      <div className="video-player__wrapper">
        <iframe
          className="video-player__iframe"
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="video-player__meta">
        <h2 className="video-player__title">{video.title}</h2>
        <span className="video-player__position">Video {video.position}</span>
      </div>
    </section>
  )
}

export default VideoPlayer
