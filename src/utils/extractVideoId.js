/**
 * Extracts a YouTube video ID from a URL or raw ID string.
 */
export function extractYouTubeVideoId(input) {
  const value = input?.trim()
  if (!value) return null

  if (/^[\w-]{11}$/.test(value)) return value

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`)

    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.slice(1).split('/')[0]
      return id || null
    }

    if (url.hostname.includes('youtube.com')) {
      const fromQuery = url.searchParams.get('v')
      if (fromQuery) return fromQuery

      const embedMatch = url.pathname.match(/\/embed\/([\w-]{11})/)
      if (embedMatch) return embedMatch[1]

      const shortsMatch = url.pathname.match(/\/shorts\/([\w-]{11})/)
      if (shortsMatch) return shortsMatch[1]
    }
  } catch {
    return null
  }

  return null
}
