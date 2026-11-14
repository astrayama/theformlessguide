import { useEffect, useState } from 'react';
import { MOMENTS_PLAYLIST_ID, UPLOADS_PLAYLIST_ID, FALLBACK_EPISODES } from './library';

const API = 'https://www.googleapis.com/youtube/v3';
const key = () => import.meta.env.VITE_YOUTUBE_API_KEY;

// YouTube titles carry a tail of hashtags and emoji. Keep the words.
export function cleanTitle(raw) {
  return raw
    .split('#')[0]
    .replace(/[\p{Extended_Pictographic}️‍]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// "PT1H2M3S" to seconds.
function seconds(iso) {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || '');
  if (!m) return 0;
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
}

const items = (data) =>
  (data.items || [])
    .filter((it) => it.snippet?.thumbnails && Object.keys(it.snippet.thumbnails).length)
    .map((it) => ({ id: it.snippet.resourceId.videoId, title: cleanTitle(it.snippet.title) }))
    .filter((v) => v.title);

// Real Shorts, shown if the API key is missing or the request fails.
const FALLBACK_SHORTS = [
  { id: 'QsQ6q3Qw6Nw', title: 'Stop Fighting Reality, Accept Now' },
  { id: 'IfCfcqGY0hE', title: 'Stop Trying To "Escape" The Matrix' },
  { id: 'rNtg__KefHw', title: 'A Delusion Of The Present' },
  { id: 'Ixl6oUdWr_Q', title: 'Gnosticism: Waking Up From The Material Construct' },
  { id: '_nDKKFlRTfw', title: 'Sacred Geometry: The Beginning' },
  { id: '9m1cIb2m2y8', title: 'Decoding Your Consciousness' },
  { id: '_166YIq5nDU', title: "That Dream Feeling Isn't Fake" },
];

export function useShorts() {
  const [videos, setVideos] = useState(FALLBACK_SHORTS);
  useEffect(() => {
    if (!key()) return;
    fetch(`${API}/playlistItems?part=snippet&playlistId=${MOMENTS_PLAYLIST_ID}&maxResults=12&key=${key()}`)
      .then((r) => r.json())
      .then((data) => {
        const list = items(data);
        if (list.length) setVideos(list);
      })
      .catch(() => {});
  }, []);
  return videos;
}

// The newest long-form uploads. The uploads playlist mixes in Shorts, so a
// second call reads durations and keeps only videos of four minutes or more.
export function useLatestEpisodes(count = 5) {
  const [episodes, setEpisodes] = useState(FALLBACK_EPISODES.slice(0, count));
  useEffect(() => {
    if (!key()) return;
    let cancelled = false;
    (async () => {
      try {
        const found = [];
        let pageToken = '';
        // Shorts outnumber episodes, so read up to three pages of uploads.
        for (let page = 0; page < 3 && found.length < count; page++) {
          const data = await fetch(
            `${API}/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=50&key=${key()}${pageToken ? `&pageToken=${pageToken}` : ''}`
          ).then((r) => r.json());
          const recent = items(data);
          if (!recent.length) break;
          const details = await fetch(
            `${API}/videos?part=contentDetails&id=${recent.map((v) => v.id).join(',')}&key=${key()}`
          ).then((r) => r.json());
          const long = new Set(
            (details.items || []).filter((d) => seconds(d.contentDetails?.duration) >= 240).map((d) => d.id)
          );
          found.push(...recent.filter((v) => long.has(v.id)));
          pageToken = data.nextPageToken;
          if (!pageToken) break;
        }
        const list = found.slice(0, count);
        if (!cancelled && list.length >= 3) setEpisodes(list);
      } catch {
        /* keep the fallback */
      }
    })();
    return () => { cancelled = true; };
  }, [count]);
  return episodes;
}
