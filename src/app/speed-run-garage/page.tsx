import SpecSheet from '@/components/SpecSheet'
import VideoGallery from '@/components/VideoGallery'
import SpeedLog from '@/components/SpeedLog'

export default function SpeedRunGaragePage() {
  const limitlessSpecs = {
    chassis: 'Arrma Limitless V1',
    personalBest: '120 mph',
    gyro: 'Futaba GYC441',
    aerodynamics: 'RAZ1',
    motor: '[User to fill in]',
    esc: '[User to fill in]',
    gearing: '[User to fill in]'
  }

  const videos = [
    {
      id: 'hqD6L6enh3E',
      title: 'Limitless 5s 120 Mph & New body reveal!'
    },
    {
      id: '_hzsbg2GX6M',
      title: 'Arrma Limitless 120+ Mph'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="section-title">Speed Run Garage</h1>
        <p className="subtitle">The Pursuit of Speed</p>
      </div>

      {/* Story Section */}
      <div className="garage-card">
        <h2 className="text-2xl font-bold text-white mb-6">The Story</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          This isn&apos;t just about going fast; it&apos;s a battle against physics. The &apos;Speed Run Garage&apos; is the lab where engineering meets raw power. It&apos;s the story of the Arrma Limitless V1, a machine honed for one purpose: to break barriers. From installing the precision Futaba GYC441 gyro for locked-in stability to sculpting the air with RAZ1 aerodynamics, every modification is a calculated step toward the next personal best. This is the relentless pursuit of 120 mph and beyond, one high-voltage pass at a time.
        </p>
      </div>

      {/* Car Showcase */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Arrma Limitless V1</h2>
          <SpecSheet specs={limitlessSpecs} />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Video Gallery</h2>
          <VideoGallery videos={videos} />
        </div>
      </div>

      {/* Speed Log */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Speed Log</h2>
        <SpeedLog />
      </div>
    </div>
  )
}