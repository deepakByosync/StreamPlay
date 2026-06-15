/**
 * YouTube Playlist Configuration
 * ─────────────────────────────────
 * Change PLAYLISTS array to add/remove playlists.
 * Set your API key in .env as VITE_YOUTUBE_API_KEY
 */

export const PLAYLISTS = [
  {
    id: "PLG9aCp4uE-s0bu-I8fgDXXhVLO4qVROGy",
    label: "1. DBMS | Vishvadeep Gothi",
  },
  {
    id: "PLVkBalXJpBzIEi6xfQrgkFlAGINskg6Yv",
    label: "2. Complete Data Structure | Vishvadeep Gothi Sir",
  },
  {
    id: "PLTPI8RAm0JQwjcu_SzYRr6jWoS09WaJ4B",
    label: "3. Data Structure by Vishwadeep Gothi Sir",
  },
  {
    id: "PLbE3-5DBkMUkATaUFgDIpBDbfnym0qvsQ",
    label: "4. C Programming | Vishvadeep Gothi",
  },
  {
    id: "PLLB_OuLWDooCvIv1KWvNFznlB2S54ZuQ2",
    label: "5. Operating System | Vishvadeep Gothi Sir ",
  },
  {
    id: "PLfBmLlr4bjdcE_QIsPJgercx4GEJGy5Ep",
    label: "6. OS Vishvadeep Gothi Sir",
  },
  {
    id: "PLG9aCp4uE-s0xddCBjwMDnEVyc523WbA2",
    label: "7. COA 2.0 | Vishvadeep Gothi",
  },
  {
    id: "PLc7UVOWwlKr5Asvqv1zpmDxjXF5ZqvB8k",
    label: "8. Computer Organization and Architecture || Vishvadeep Gothi",
  },
  {
    id: "PL3eEXnCBViH-T76wHeHTlp6hoD-inQLPp",
    label: "9. Discrete Mathematics | CS & IT | GATE 2024 Series",
  },
  {
    id: "PLEBuowGoCtr0jQwu937nDiABSVbC_Lsp5",
    label: "10. Digital Logic | Digital Logic By Chandan Sir",
  },
  // { id: 'PLOG_8OlGMp73cbcI1vw-q0I_IyjlsEhyI', label: 'Playlist 11' },
  {
    id: "PL3eEXnCBViH-AnU_c_8uFSaMK1OfgtDGx",
    label: "11. Computer Network | GATE 2025 CSE | Gate Crash Course",
  },
  {
    id: "PLPvaSRcEQh4kfVIyezAQu9Mvj5FBk_OEN",
    label: "12. Database Management System | CS & IT | GATE 2024",
  },
  {
    id: "PLEBuowGoCtr3FmooUpB616CIwkKZMJc8v",
    label: "13. Theory Of Computation | TOC",
  },
  {
    id: "PL3eEXnCBViH_ePbZWc1nKZuyfru6sgioD",
    label: "14. Theory Of Computation: CS & IT | GATE Free Crash Course",
  },
  {
    id: "PLOG_8OlGMp70Qy_dOSXNFFuyNqKHeMVej",
    label: "15. Compiler Design | Computer Science And IT | ",
  },
  {
    id: "PLG9aCp4uE-s0020AijwvuMigPElFaL-Bo",
    label: "16. Practice DS With Vishvadeep ",
  },
  {
    id: "PLG9aCp4uE-s1C0YIEIqS1O-tONIL55IQk",
    label: "17. Practice OS With Vishvadeep",
  },
  {
    id: "PLU6SqdYcYsfKV1QmzQNtzMuIH7mq5qb62",
    label: "18. Linear Algebra Engineering Mathematics for GATE | By GP",
  },
  {
    id: "PLvTTv60o7qj_tdY9zH7YceES7jfXiZkAz",
    label: "19. Engineering Maths : For All Branches ",
  },
  {
    id: "PLxCzCOWd7aiGmXg4NoX6R31AsC5LeCPHe",
    label: "20. Digital Logic (Complete Playlist) ",
  },
];

/** Static featured video — header button se play hoti hai */
export const STATIC_VIDEO = {
  id: '7-lK9EpBS_Y',
  title: 'Featured Video',
};

/** Default playlist shown on first load */
export const DEFAULT_PLAYLIST_ID = PLAYLISTS[0].id;

/** Read API key from Vite environment variables */
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";
