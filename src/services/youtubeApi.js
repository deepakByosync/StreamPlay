const BASE_URL = 'https://www.googleapis.com/youtube/v3'

async function apiFetch(url) {
  const response = await fetch(url)
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const message = body?.error?.message || `YouTube API error (${response.status})`
    throw new Error(message)
  }
  return response.json()
}

/**
 * Fetches all items from a playlist, handling pagination.
 */
export async function fetchPlaylistItems(playlistId, apiKey) {
  const items = []
  let pageToken = ''

  do {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: '50',
      key: apiKey,
    })
    if (pageToken) params.set('pageToken', pageToken)

    const data = await apiFetch(`${BASE_URL}/playlistItems?${params}`)
    items.push(...(data.items || []))
    pageToken = data.nextPageToken || ''
  } while (pageToken)

  return items
}

/**
 * Fetches video durations in batches of 50.
 */
export async function fetchVideoDurations(videoIds, apiKey) {
  const durations = {}
  const batchSize = 50

  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize)
    const params = new URLSearchParams({
      part: 'contentDetails',
      id: batch.join(','),
      key: apiKey,
    })

    const data = await apiFetch(`${BASE_URL}/videos?${params}`)
    for (const video of data.items || []) {
      durations[video.id] = video.contentDetails?.duration || null
    }
  }

  return durations
}

/**
 * Fetches playlist metadata (title, description).
 */
export async function fetchPlaylistInfo(playlistId, apiKey) {
  const params = new URLSearchParams({
    part: 'snippet',
    id: playlistId,
    key: apiKey,
  })

  const data = await apiFetch(`${BASE_URL}/playlists?${params}`)
  const playlist = data.items?.[0]
  if (!playlist) throw new Error('Playlist not found')

  return {
    title: playlist.snippet.title,
    description: playlist.snippet.description,
    thumbnail: playlist.snippet.thumbnails?.medium?.url || '',
  }
}

/**
 * Fetches metadata for a single video by ID.
 */
export async function fetchVideoInfo(videoId, apiKey) {
  const params = new URLSearchParams({
    part: 'snippet',
    id: videoId,
    key: apiKey,
  })

  const data = await apiFetch(`${BASE_URL}/videos?${params}`)
  const video = data.items?.[0]
  if (!video) throw new Error('Video not found')

  const thumbs = video.snippet.thumbnails

  return {
    id: videoId,
    title: video.snippet.title,
    thumbnail:
      thumbs?.maxres?.url ||
      thumbs?.high?.url ||
      thumbs?.medium?.url ||
      thumbs?.default?.url ||
      '',
    position: null,
  }
}

/**
 * Fetches and normalizes all videos for a playlist.
 */
export async function fetchPlaylistVideos(playlistId, apiKey) {
  const [playlistInfo, items] = await Promise.all([
    fetchPlaylistInfo(playlistId, apiKey),
    fetchPlaylistItems(playlistId, apiKey),
  ])

  const videoIds = items
    .map((item) => item.contentDetails?.videoId)
    .filter(Boolean)

  const durations = await fetchVideoDurations(videoIds, apiKey)

  const videos = items
    .filter((item) => item.contentDetails?.videoId)
    .map((item, index) => {
      const videoId = item.contentDetails.videoId
      const thumbs = item.snippet.thumbnails

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          thumbs?.maxres?.url ||
          thumbs?.high?.url ||
          thumbs?.medium?.url ||
          thumbs?.default?.url ||
          '',
        duration: durations[videoId] || null,
        position: index + 1,
        publishedAt: item.snippet.publishedAt,
      }
    })

  return { playlistInfo, videos }
}
