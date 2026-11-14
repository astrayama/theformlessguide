// Every outbound link and playlist on the site lives here, so a renamed or
// removed playlist is a one-line fix. IDs match youtube.com/@TheFormlessGuide.

export const YOUTUBE_URL = 'https://www.youtube.com/@TheFormlessGuide';
export const CHANNEL_PLAYLISTS_URL = `${YOUTUBE_URL}/playlists`;
export const SUBSCRIBE_URL = `${YOUTUBE_URL}?sub_confirmation=1`;
export const SPOTIFY_URL = 'https://open.spotify.com/show/2oPHFNP3WpLH0Kg8jQsl3I';
export const TIKTOK_URL = 'https://www.tiktok.com/@theformlessguide';
export const INSTAGRAM_URL = 'https://www.instagram.com/theformlessguide/';
export const PINTEREST_URL = 'https://www.pinterest.com/theformlessguide/';
export const JOURNAL_URL = 'https://yggdrasil-journal.lovable.app/';
export const STORE_URL = 'https://theformlessguide.printful.me';

export const playlistUrl = (id) => `https://www.youtube.com/playlist?list=${id}`;
export const watchUrl = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

// Where the Guide can be found, in the order the footer lists them.
export const CHANNELS = [
  { name: 'YouTube', href: YOUTUBE_URL },
  { name: 'Spotify', href: SPOTIFY_URL },
  { name: 'TikTok', href: TIKTOK_URL },
  { name: 'Instagram', href: INSTAGRAM_URL },
  { name: 'Pinterest', href: PINTEREST_URL },
  { name: 'Yggdrasil Journal', href: JOURNAL_URL },
];

// The seven sections, mapped root to crown. The header dots, the page tint
// and each section's eyebrow all read from this list.
export const SECTIONS = [
  { id: 'hero', nav: null, chakra: 'Root', color: '#ff4d4d', ink: '#b3261e' },
  { id: 'guides', nav: 'Guides', chakra: 'Sacral', color: '#ff8a3d', ink: '#b3540a' },
  { id: 'teachings', nav: 'Teachings', chakra: 'Solar Plexus', color: '#ffc93c', ink: '#8a5f00' },
  { id: 'about', nav: 'About', chakra: 'Heart', color: '#3ccf7e', ink: '#1c7447' },
  { id: 'stillness', nav: 'Practice', chakra: 'Throat', color: '#3c9bff', ink: '#1a5fb4' },
  { id: 'catalog', nav: 'Library', chakra: 'Third Eye', color: '#7a5cff', ink: '#553bc0' },
  { id: 'shop', nav: 'Support', chakra: 'Crown', color: '#d65cff', ink: '#9a2bb5' },
];
export const sectionById = (id) => SECTIONS.find((s) => s.id === id) || SECTIONS[0];

// The beginner playlist. The hero's BEGIN THE JOURNEY button opens this.
export const START_HERE = {
  id: 'PLg1ZRqch8VjM-NhksBcasBFyU-Vge4G2Z',
  video: 'WgpEt_eIt24',
};

// Shorts playlist behind Formless Moments.
export const MOMENTS_PLAYLIST_ID = 'PLg1ZRqch8VjMwPQ9NRigFX7DUlXi9aqHJ';

// The channel's uploads playlist. Latest episodes are read from it.
export const UPLOADS_PLAYLIST_ID = 'UUzH849dsPIS7fzkTw7FFUlQ';

// Shown when the YouTube API key is missing or the request fails.
export const FALLBACK_EPISODES = [
  { id: 'PPRuOjwV1PA', title: 'Your Brain Cannot Feel Pain. So Why Do You Suffer?' },
  { id: 'PWvU-1isQew', title: 'Art Of Allowance: The Four Words You Need To Know' },
  { id: 'Nv0AppMbmvs', title: 'Empty Your Cup: A Full Cup Cannot Learn (How to Build the Mind of a Seeker)' },
  { id: 'Mn7ntznXBjQ', title: 'Carl Jung Shadow Work: The Part of You You Fear Holds the Key to Clarity' },
  { id: 'I9dOguO3a3k', title: 'Autumn Reflection on Letting Go: How Adversity Refines You and Why Trying Is Enough' },
];

// Guided practice, linked from the Practice section.
export const PRACTICES = [
  {
    title: 'One breath',
    note: 'In for four, hold for two, out for six. The episode on why it works.',
    href: watchUrl('Y7WRhS2VvHI'),
    length: 'Episode',
  },
  {
    title: 'Quick guided meditations',
    note: 'Five to fifteen minutes for busy days.',
    href: playlistUrl('PLg1ZRqch8VjNlu0KLPI58iANTLvuoFcvz'),
    length: 'Playlist',
  },
  {
    title: 'Guided meditation series',
    note: 'A guided journey to consciousness.',
    href: playlistUrl('PLg1ZRqch8VjP3fMGKgO_yK-3An5nY0Bxz'),
    length: 'Playlist',
  },
];

export const PATHS = [
  {
    key: 'begin',
    tab: 'Begin',
    intent: 'I am new here',
    color: '#0f8f7c',
    playlists: [
      {
        id: START_HERE.id,
        video: START_HERE.video,
        title: 'Start Here: The Formless Path',
        note: "A beginner's guide to the whole path. Watch these first.",
      },
      {
        id: 'PLg1ZRqch8VjOUCTPgC0r4WixVb9UmHWEB',
        video: 'I9dOguO3a3k',
        title: 'Mindful Living and Daily Growth',
        note: 'Letting go, presence and inner peace in ordinary days.',
      },
      {
        id: 'PLg1ZRqch8VjOdY4ol0VR5vAluFAfWl7TN',
        video: 'PWvU-1isQew',
        title: 'Spiritual Stories and Guided Reflections',
        note: 'Stories and reflections for transformation.',
      },
    ],
  },
  {
    key: 'meditate',
    tab: 'Meditate',
    intent: 'I want to sit',
    color: '#1a5fb4',
    playlists: [
      {
        id: 'PLg1ZRqch8VjNlu0KLPI58iANTLvuoFcvz',
        video: 'k-OyQF70EW4',
        title: 'Quick Guided Meditations',
        note: 'Five to fifteen minutes for busy days.',
      },
      {
        id: 'PLg1ZRqch8VjP3fMGKgO_yK-3An5nY0Bxz',
        video: 'plYp_eJK_2I',
        title: 'Guided Meditation Series',
        note: 'A guided journey to consciousness.',
      },
      {
        id: 'PLg1ZRqch8VjMVahUAA9H7RE_0Covotee4',
        video: 'qalQrT0KeB0',
        title: 'Dream Work',
        note: 'Lucid dreaming, dream yoga and dream interpretation.',
      },
    ],
  },
  {
    key: 'mind',
    tab: 'Mind and Shadow',
    intent: 'I want to understand my mind',
    color: '#553bc0',
    playlists: [
      {
        id: 'PLg1ZRqch8VjN9GvGXUSa52Cwtrq1B--6T',
        video: 'TPhFpD-mRhU',
        title: 'Shadow Work and Deep Psychology',
        note: 'Understanding your hidden self.',
      },
      {
        id: 'PLg1ZRqch8VjPqGeQ84DnCxCvr_thY9Apf',
        video: 'Sq27hwNBrr0',
        title: 'Mastering Mindset and Mental Health',
        note: 'Overthinking, ego and self doubt.',
      },
      {
        id: 'PLg1ZRqch8VjM1rfgEM69b4hzlJsdW9ra2',
        video: '8Ny4nWM60Hc',
        title: 'Overcoming Negativity',
        note: 'Reframe negative thoughts and find inner strength.',
      },
      {
        id: 'PLg1ZRqch8VjMHmF4XZamcVcvKov4qzHsv',
        video: 'fNychSswAkg',
        title: 'Pop Culture Meets Psychology',
        note: 'Films, shows and stories through a psychological lens.',
      },
    ],
  },
  {
    key: 'energy',
    tab: 'Energy',
    intent: 'I want to work with energy',
    color: '#b3287a',
    playlists: [
      {
        id: 'PLg1ZRqch8VjP1fSfh4OEstMTMjN6ERJA9',
        video: 'qAXb5NzneRY',
        title: 'Chakra Healing',
        note: 'Chakras explained, with guided chakra meditations.',
      },
      {
        id: 'PLg1ZRqch8VjMR9cbZyei7UN-UzezESfsz',
        video: 'kSfWsnE4Y2U',
        title: 'Heart Chakra and Compassion',
        note: 'Open Anahata. Self love and forgiveness.',
      },
      {
        id: 'PLg1ZRqch8VjNSG0B38CUFObbTl38OU_e0',
        video: 'YyCHfKva8MY',
        title: 'Speak Your Truth',
        note: 'Throat chakra, authenticity and self expression.',
      },
      {
        id: 'PLg1ZRqch8VjP4PVjrdEbw3JVTMxSuAc4P',
        video: 'PWvU-1isQew',
        title: 'Third Eye and Crown Chakra',
        note: 'Expanding awareness and intuition.',
      },
      {
        id: 'PLg1ZRqch8VjPXCOpSsoctk-l3ec_vh5gT',
        video: 'VoZ_qMKXRx4',
        title: 'Divine Masculine and Divine Feminine',
        note: 'Bring the two energies into alignment.',
      },
    ],
  },
  {
    key: 'cosmos',
    tab: 'Cosmos',
    intent: 'I want the big picture',
    color: '#8a5f00',
    playlists: [
      {
        id: 'PLg1ZRqch8VjOjhbFnuHXXl6LkA35MOL6E',
        video: 'yaiEPXKtt3s',
        title: 'Sacred Geometry Explained',
        note: 'The blueprints of consciousness.',
      },
      {
        id: 'PLg1ZRqch8VjO-ZzxtFcRexbP6UOFO9u14',
        video: 'PWvU-1isQew',
        title: 'Exploring the Human Experience',
        note: 'Consciousness, Gnosticism and the cosmos.',
      },
    ],
  },
];

export const PLAYLIST_COUNT = PATHS.reduce((n, p) => n + p.playlists.length, 0);
