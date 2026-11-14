// Every playlist link on the site lives here, so a renamed or removed
// playlist is a one-line fix. IDs match youtube.com/@TheFormlessGuide/playlists.

export const CHANNEL_PLAYLISTS_URL = 'https://www.youtube.com/@TheFormlessGuide/playlists';

export const playlistUrl = (id) => `https://www.youtube.com/playlist?list=${id}`;

// The beginner playlist. The hero's BEGIN THE JOURNEY button opens this.
export const START_HERE = {
  id: 'PLg1ZRqch8VjM-NhksBcasBFyU-Vge4G2Z',
  video: 'WgpEt_eIt24',
};

// Shorts playlist behind the Formless Moments section.
export const MOMENTS_PLAYLIST_ID = 'PLg1ZRqch8VjMwPQ9NRigFX7DUlXi9aqHJ';

export const PATHS = [
  {
    key: 'begin',
    tab: 'Begin',
    intent: 'I am new here',
    color: '#00f5d4',
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
    color: '#5cb8ff',
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
    color: '#b79bff',
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
    color: '#ff8fcf',
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
    color: '#ffd166',
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
