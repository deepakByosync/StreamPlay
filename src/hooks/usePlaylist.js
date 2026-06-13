import { useState, useEffect, useCallback } from 'react'
import { fetchPlaylistVideos } from '../services/youtubeApi'
import { YOUTUBE_API_KEY } from '../config/playlistConfig'

export function usePlaylist(playlistId) {
  const [videos, setVideos] = useState([])
  const [playlistInfo, setPlaylistInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadPlaylist = useCallback(async () => {
    if (!playlistId) {
      setVideos([])
      setPlaylistInfo(null)
      setLoading(false)
      setError(null)
      return
    }

    if (!YOUTUBE_API_KEY) {
      setError(
        'YouTube API key missing. Add VITE_YOUTUBE_API_KEY to your .env file.'
      )
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await fetchPlaylistVideos(playlistId, YOUTUBE_API_KEY)
      setVideos(data.videos)
      setPlaylistInfo(data.playlistInfo)
    } catch (err) {
      setError(err.message || 'Failed to load playlist')
      setVideos([])
      setPlaylistInfo(null)
    } finally {
      setLoading(false)
    }
  }, [playlistId])

  useEffect(() => {
    loadPlaylist()
  }, [loadPlaylist])

  return { videos, playlistInfo, loading, error, retry: loadPlaylist }
}
