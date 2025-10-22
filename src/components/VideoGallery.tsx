interface Video {
  id: string
  title: string
  src?: string  // For local videos
  poster?: string  // For video thumbnails
  channel?: string
  duration?: string
}

interface VideoGalleryProps {
  videos: Video[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="space-y-6">
      {/* YouTube Channel Promotion */}
      <div className="garage-card bg-gradient-to-r from-red-600 to-red-500 border-red-400">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">🎬 AkjellRC YouTube Channel</h3>
            <p className="text-red-100">Subscribe for more RC speed runs and bashing content!</p>
          </div>
          <a
            href="https://www.youtube.com/@akjellrc/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center space-x-2"
          >
            <span>🔔</span>
            <span>Subscribe</span>
          </a>
        </div>
      </div>

      {/* Video Grid */}
      {videos.map((video, index) => (
        <div key={video.id} className="garage-card">
          <h4 className="text-lg font-semibold text-white mb-4">{video.title}</h4>
          <div className="aspect-video">
            {video.src ? (
              // Local video
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                muted
                loop
                className="rounded-lg"
                poster={video.poster || "/images/rc-car-2478333_1280.jpg"}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // YouTube video (fallback)
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            )}
          </div>
          <div className="mt-3 text-center">
            {video.src ? (
              <span className="text-garage-accent font-medium">
                💾 Local Video • {video.duration || 'HD Quality'}
              </span>
            ) : (
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-garage-accent hover:text-garage-secondary text-sm"
              >
                Watch on YouTube →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}