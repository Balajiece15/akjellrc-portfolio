interface Video {
  id: string
  title: string
}

interface VideoGalleryProps {
  videos: Video[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="space-y-6">
      {videos.map((video, index) => (
        <div key={video.id} className="garage-card">
          <h4 className="text-lg font-semibold text-white mb-4">{video.title}</h4>
          <div className="aspect-video">
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
          </div>
        </div>
      ))}
    </div>
  )
}