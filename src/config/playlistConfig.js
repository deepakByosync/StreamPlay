/**
 * YouTube Playlist Configuration
 * ─────────────────────────────────
 * Change PLAYLISTS array to add/remove playlists.
 * Set your API key in .env as VITE_YOUTUBE_API_KEY
 */

export const PLAYLISTS = [
  { id: 'PLG9aCp4uE-s0bu-I8fgDXXhVLO4qVROGy', label: 'Playlist 1' },
  { id: 'PLVkBalXJpBzIEi6xfQrgkFlAGINskg6Yv', label: 'Playlist 2' },
  { id: 'PLTPI8RAm0JQwjcu_SzYRr6jWoS09WaJ4B', label: 'Playlist 3' },
  { id: 'PLbE3-5DBkMUkATaUFgDIpBDbfnym0qvsQ', label: 'Playlist 4' },
  { id: 'PLLB_OuLWDooCvIv1KWvNFznlB2S54ZuQ2', label: 'Playlist 5' },
  { id: 'PLfBmLlr4bjdcE_QIsPJgercx4GEJGy5Ep', label: 'Playlist 6' },
  { id: 'PLG9aCp4uE-s0xddCBjwMDnEVyc523WbA2', label: 'Playlist 7' },
  { id: 'PLc7UVOWwlKr5Asvqv1zpmDxjXF5ZqvB8k', label: 'Playlist 8' },
  { id: 'PL3eEXnCBViH-T76wHeHTlp6hoD-inQLPp', label: 'Playlist 9' },
  { id: 'PLEBuowGoCtr0jQwu937nDiABSVbC_Lsp5', label: 'Playlist 10' },
  { id: 'PLOG_8OlGMp73cbcI1vw-q0I_IyjlsEhyI', label: 'Playlist 11' },
  { id: 'PL3eEXnCBViH-AnU_c_8uFSaMK1OfgtDGx', label: 'Playlist 12' },
  { id: 'PLPvaSRcEQh4kfVIyezAQu9Mvj5FBk_OEN', label: 'Playlist 13' },
  { id: 'PLG9aCp4uE-s0020AijwvuMigPElFaL-Bo', label: 'Playlist 14' },
  { id: 'PL3eEXnCBViH_ePbZWc1nKZuyfru6sgioD', label: 'Playlist 15' },
  { id: 'PLEBuowGoCtr3FmooUpB616CIwkKZMJc8v', label: 'Playlist 16' },
  { id: 'PLG9aCp4uE-s1C0YIEIqS1O-tONIL55IQk', label: 'Playlist 17' },
  { id: 'PLU6SqdYcYsfKV1QmzQNtzMuIH7mq5qb62', label: 'Playlist 18' },
  { id: 'PLvTTv60o7qj_tdY9zH7YceES7jfXiZkAz', label: 'Playlist 19' },
]

/** Default playlist shown on first load */
export const DEFAULT_PLAYLIST_ID = PLAYLISTS[0].id

/** Read API key from Vite environment variables */
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || ''
