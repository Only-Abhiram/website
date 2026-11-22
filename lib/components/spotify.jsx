
export default function SpotifyEmbed() {
    return (
      <section className="w-full px-5 py-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs  tracking-widest text-neutral-400 mb-3">
            currently vibing to
          </p>
  
          <div className="rounded-xl overflow-hidden">
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/playlist/${process.env.NEXT_PUBLIC_SPOTIFY}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Abhiram's Spotify playlist"
            />
          </div>
        </div>
      </section>
    );
  }
  