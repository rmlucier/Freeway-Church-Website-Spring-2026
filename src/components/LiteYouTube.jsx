import { useState } from 'react';

/**
 * Click-to-play YouTube embed.
 *
 * Until the user presses play, we only render a static thumbnail image — no
 * YouTube iframe, no ~500kB of player scripts, no tracking cookies. On click
 * we swap in a privacy-enhanced (youtube-nocookie.com) iframe with autoplay,
 * so one click = video starts.
 */
export default function LiteYouTube({ videoId, title }) {
  const [activated, setActivated] = useState(false);

  // maxresdefault is only guaranteed if the uploader provided a high-res
  // thumbnail; hqdefault always exists as a fallback.
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbFallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  if (activated) {
    return (
      <iframe
        src={iframeSrc}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Play: ${title}`}
      className="group absolute inset-0 h-full w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-fc-teal"
    >
      <img
        src={thumb}
        onError={(e) => {
          // Fall back to hqdefault if maxres doesn't exist for this video.
          if (e.currentTarget.src !== thumbFallback) {
            e.currentTarget.src = thumbFallback;
          }
        }}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-fc-black/60 via-fc-black/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-fc-teal text-fc-black shadow-xl transition-transform duration-300 group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 translate-x-0.5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
