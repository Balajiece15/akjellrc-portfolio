import SpecSheet from '@/components/SpecSheet'
import VideoGallery from '@/components/VideoGallery'
import BuildLog from '@/components/BuildLog'

export default function BasherFleetPage() {
  const xmaxxSpecs = {
    chassis: 'Traxxas X-Maxx',
    power: '8S LiPo',
    keyUpgrades: '[User to fill in]'
  }

  const videos = [
    {
      id: 'zFeviNCKnbA',
      title: 'Sunday Stroll in the Park With Savage FLUX & X-Maxx'
    },
    {
      id: 'xS7M3XZBwIQ',
      title: 'X-Maxx vs. GoPro 11'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="section-title">Basher Fleet</h1>
        <p className="subtitle">X-Maxx Sunday</p>
      </div>

      {/* Story Section */}
      <div className="garage-card">
        <h2 className="text-2xl font-bold text-white mb-6">The Story</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          Then there&apos;s &apos;X-Maxx Sunday.&apos; This is the other side of the passion—the pure, chaotic joy of raw power. The &apos;Basher Fleet&apos; is about sending it. It&apos;s about the thunder of an 8S monster truck, the massive air, the backflips, and the sheer durability to survive it all. This isn&apos;t about the stopwatch; it&apos;s about the spectacle. It&apos;s the grin you get when a giant like the X-Maxx defies gravity and comes back for more.
        </p>
      </div>

      {/* Car Showcase */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Traxxas X-Maxx</h2>
          <SpecSheet specs={xmaxxSpecs} />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Video Gallery</h2>
          <VideoGallery videos={videos} />
        </div>
      </div>

      {/* Build & Repair Log */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Build & Repair Log</h2>
        <BuildLog />
      </div>
    </div>
  )
}