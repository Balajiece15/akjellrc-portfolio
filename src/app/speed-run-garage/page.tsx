import SpecSheet from '@/components/SpecSheet'
import VideoGallery from '@/components/VideoGallery'
import SpeedLog from '@/components/SpeedLog'

export default function SpeedRunGaragePage() {
  const limitlessSpecs = {
    chassis: 'Arrma Limitless V1',
    personalBest: '120 mph',
    gyro: 'Futaba GYC441 - Precision Stability Control',
    aerodynamics: 'RAZ1 Custom Body - Wind-Cutting Perfection',
    motor: 'Spektrum Firma 2050Kv Brushless - Pure Thunder',
    esc: 'Spektrum Firma 160A Smart ESC - Unleashed Power',
    gearing: '11T Pinion / 54T Spur - Speed Optimized'
  }

  const videos = [
    {
      id: 'hqD6L6enh3E',
      title: 'Limitless 5s 120 Mph & New body reveal!'
    },
    {
      id: '_hzsbg2GX6M',
      title: 'Arrma Limitless 120+ Mph'
    },
    {
      id: 'T1I4Wo3YGN0',
      title: 'I Love Gyros Futaba GYC441 Limitless Speed Run 115MPH #speedrun'
    },
    {
      id: '_h5OearQIJ4',
      title: 'RAZ1 Limitless v1 120mph pass…. #arrma #limitless #razshifrin #shorts'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-garage-dark via-orange-900/20 to-garage-medium mb-12">
        {/* High-Quality Speed Track Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
        </div>
        
        {/* Speed-themed Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Cpath d='M50 50c13.8 0 25-11.2 25-25S63.8 0 50 0 25 11.2 25 25s11.2 25 25 25z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Speed Effects */}
        <div className="absolute top-10 right-10 text-6xl opacity-50 animate-pulse z-20">💨</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-40 animate-bounce z-20">⚡</div>
        <div className="absolute top-1/3 right-20 text-4xl opacity-30 transform rotate-12 z-20">🏁</div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🚀</span>
              </div>
              <h1 className="text-8xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent tracking-tight">
                Speed Run Garage
              </h1>
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">⚡</span>
              </div>
            </div>
            <p className="text-3xl text-orange-300 font-light mb-8">
              The Pursuit of Speed
            </p>
            
            {/* Achievement Badges */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="bg-garage-medium border-2 border-orange-500 px-6 py-3 rounded-full text-orange-400 font-bold shadow-lg">
                🏆 120 MPH Record
              </div>
              <div className="bg-garage-medium border-2 border-red-500 px-6 py-3 rounded-full text-red-400 font-bold shadow-lg">
                ⚡ Limitless V1
              </div>
              <div className="bg-garage-medium border-2 border-yellow-500 px-6 py-3 rounded-full text-yellow-400 font-bold shadow-lg">
                🎯 Precision Tuned
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HD Car Showcase Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-garage-dark to-garage-medium border border-orange-500/30">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
              }}
            />
          </div>
          
          <div className="relative z-20 p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Arrma Limitless V1
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  The ultimate expression of RC speed engineering. Built for one purpose: to shatter barriers and redefine what&apos;s possible on four wheels.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-garage-medium/50 rounded-lg border border-orange-500/30">
                    <div className="text-3xl font-bold text-orange-400">120</div>
                    <div className="text-gray-400 text-sm">MPH Peak</div>
                  </div>
                  <div className="text-center p-4 bg-garage-medium/50 rounded-lg border border-red-500/30">
                    <div className="text-3xl font-bold text-red-400">6S</div>
                    <div className="text-gray-400 text-sm">Power Plant</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30"></div>
                <div 
                  className="relative h-80 bg-cover bg-center rounded-2xl border-2 border-orange-500/50"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-bold">Ready for Action</div>
                    <div className="text-xs text-gray-300">Speed Run Configuration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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