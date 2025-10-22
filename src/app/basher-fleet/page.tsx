import SpecSheet from '@/components/SpecSheet'
import VideoGallery from '@/components/VideoGallery'
import BuildLog from '@/components/BuildLog'

export default function BasherFleetPage() {
  const xmaxxSpecs = {
    chassis: 'Traxxas X-Maxx 8S - The Beast Unleashed',
    power: '8S LiPo - Earth-Shaking 30+ Volts',
    suspension: 'GTX Shocks - Air-Time Champions',
    tires: 'Sledgehammer Belted - Grip & Destruction',
    motor: 'VXL-8s Brushless - Relentless Torque Monster',
    keyUpgrades: 'Aluminum Chassis Brace, RPM Arms, Steel Driveshafts - Battle-Tested Armor'
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
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-garage-dark via-red-900/20 to-garage-medium mb-12">
        {/* HD Off-Road Action Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544128784-7e4fb04eaaa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
        </div>
        
        {/* Action-themed Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M60 60c16.6 0 30-13.4 30-30S76.6 0 60 0 30 13.4 30 30s13.4 30 30 30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Action Effects */}
        <div className="absolute top-10 right-10 text-6xl opacity-50 animate-pulse z-20">💥</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-40 animate-bounce z-20">🚛</div>
        <div className="absolute top-1/3 right-20 text-4xl opacity-30 transform rotate-45 z-20">💨</div>
        <div className="absolute bottom-1/3 left-20 text-3xl opacity-20 transform -rotate-12 z-20">🔥</div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🚛</span>
              </div>
              <h1 className="text-8xl font-black bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-tight">
                Basher Fleet
              </h1>
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">💥</span>
              </div>
            </div>
            <p className="text-3xl text-red-300 font-light mb-8">
              X-Maxx Sunday
            </p>
            
            {/* Action Badges */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="bg-garage-medium border-2 border-red-500 px-6 py-3 rounded-full text-red-400 font-bold shadow-lg">
                💥 High Impact
              </div>
              <div className="bg-garage-medium border-2 border-orange-500 px-6 py-3 rounded-full text-orange-400 font-bold shadow-lg">
                🚛 X-Maxx Power
              </div>
              <div className="bg-garage-medium border-2 border-yellow-500 px-6 py-3 rounded-full text-yellow-400 font-bold shadow-lg">
                🔥 8S Beast
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-12">

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
    </div>
  )
}