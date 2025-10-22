import Link from 'next/link'
import PersonalBestCard from '@/components/PersonalBestCard'
import SectionCard from '@/components/SectionCard'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-garage-dark via-garage-medium to-garage-light">
        {/* High-Quality RC Background Image */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
            }}
          />
        </div>
        
        {/* Dynamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Racing Flag Animation */}
        <div className="absolute top-10 right-10 text-6xl animate-pulse z-20">🏁</div>
        <div className="absolute bottom-10 left-10 text-4xl animate-bounce z-20">⚡</div>
        
        {/* Animated RC Car Racing Across Screen */}
        <div className="rc-car-animation"></div>
        
        {/* Floating Particles */}
        <div className="particles z-10">
          <div className="particle" style={{left: '10%', animationDelay: '0s', width: '4px', height: '4px'}}></div>
          <div className="particle" style={{left: '20%', animationDelay: '1s', width: '6px', height: '6px'}}></div>
          <div className="particle" style={{left: '30%', animationDelay: '2s', width: '3px', height: '3px'}}></div>
          <div className="particle" style={{left: '40%', animationDelay: '3s', width: '5px', height: '5px'}}></div>
          <div className="particle" style={{left: '60%', animationDelay: '1.5s', width: '4px', height: '4px'}}></div>
          <div className="particle" style={{left: '70%', animationDelay: '4s', width: '7px', height: '7px'}}></div>
          <div className="particle" style={{left: '80%', animationDelay: '2.5s', width: '3px', height: '3px'}}></div>
          <div className="particle" style={{left: '90%', animationDelay: '0.5s', width: '5px', height: '5px'}}></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative text-center mb-16 py-12">
          <div className="inline-flex items-center space-x-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-garage-accent to-red-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h1 className="text-8xl font-black text-white tracking-tight bg-gradient-to-r from-white via-garage-accent to-white bg-clip-text text-transparent">
              AkjellRC
            </h1>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-garage-accent rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,14C9.64,14 8.54,15.35 9.75,17.19C10.89,18.86 13.15,20 16,20C18.85,20 21.11,18.86 22.25,17.19C23.46,15.35 22.36,14 19,14H13M6,14C2.64,14 1.54,15.35 2.75,17.19C3.89,18.86 6.15,20 9,20C11.85,20 14.11,18.86 15.25,17.19C16.46,15.35 15.36,14 12,14H6M1,10V8A1,1 0 0,1 2,7H4.18C4.6,7 5,6.44 5,5.79C5,5.35 4.75,4.96 4.32,4.84L2.46,4.35C1.85,4.2 1.5,3.6 1.66,3C1.82,2.4 2.42,2.06 3.03,2.21L4.89,2.7C6.29,3.06 7.31,4.29 7.31,5.79C7.31,7.28 6.29,8.5 4.89,8.87L2.91,9.35C2.4,9.5 2,9.9 2,10.38V14C2,15.1 2.9,16 4,16H20C21.1,16 22,15.1 22,14V10.38C22,9.9 21.6,9.5 21.09,9.35L19.11,8.87C17.71,8.5 16.69,7.28 16.69,5.79C16.69,4.29 17.71,3.06 19.11,2.7L20.97,2.21C21.58,2.06 22.18,2.4 22.34,3C22.5,3.6 22.15,4.2 21.54,4.35L19.68,4.84C19.25,4.96 19,5.35 19,5.79C19,6.44 19.4,7 19.82,7H22A1,1 0 0,1 23,8V10H1Z"/>
              </svg>
            </div>
          </div>
          <p className="text-3xl text-gray-300 font-light bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
            Digital Garage & Speed Laboratory
          </p>
        </div>
      </div>

      {/* Enhanced Personal Best Section */}
      <div className="mb-16 flex justify-center">
        <div className="relative group">
          {/* Glowing background effect */}
          <div className="absolute -inset-6 bg-gradient-to-r from-garage-accent via-red-500 to-garage-accent rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition duration-300"></div>
          
          {/* Speed indicator background */}
          <div className="relative bg-gradient-to-br from-garage-dark to-garage-medium border-2 border-garage-accent rounded-xl p-8 shadow-2xl">
            {/* Speed gauge visual */}
            <div className="flex items-center justify-center space-x-6">
              <div className="text-8xl">🏆</div>
              <div className="text-center">
                <div className="text-7xl font-black text-garage-accent mb-2 tracking-tighter">
                  120
                </div>
                <div className="text-2xl text-white font-bold">
                  MPH RECORD
                </div>
                <div className="text-garage-secondary text-sm mt-2 flex items-center justify-center space-x-2">
                  <span>⚡</span>
                  <span>Arrma Limitless V1</span>
                  <span>⚡</span>
                </div>
              </div>
              <div className="text-8xl">🚀</div>
            </div>
            
            {/* Achievement badges */}
            <div className="flex justify-center space-x-4 mt-6">
              <div className="bg-garage-medium px-4 py-2 rounded-full text-xs text-garage-accent border border-garage-accent/30">
                🥇 Personal Best
              </div>
              <div className="bg-garage-medium px-4 py-2 rounded-full text-xs text-garage-accent border border-garage-accent/30">
                🎯 Precision Run
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Navigation Sections */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link href="/speed-run-garage" className="block group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-garage-dark to-garage-medium border border-garage-accent/30 hover:border-garage-accent transition-all duration-300 transform hover:scale-105">
            {/* HD RC Speed Car Background */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
                }}
              />
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 z-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Content */}
            <div className="relative p-8 z-20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A2,2 0 0,1 14,4V5.5L16.5,7.5L14,10H12.5V13H11V8.5L8.5,6L9.91,4.09C10.66,2.79 11.64,2 12,2M16,11A5,5 0 0,1 21,16V20H3V16A5,5 0 0,1 8,11H16M5,18H19V16A3,3 0 0,0 16,13H8A3,3 0 0,0 5,16V18Z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white group-hover:text-garage-accent transition-colors">
                    Speed Run Garage
                  </h2>
                  <p className="text-garage-accent font-semibold">The Pursuit of Speed</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Precision-engineered vehicles built for breaking barriers. Every modification calculated, every run measured.
              </p>
              
              {/* Stats bar */}
              <div className="flex space-x-4 text-sm">
                <div className="bg-garage-medium px-3 py-1 rounded-full text-garage-accent border border-garage-accent/30">
                  🏁 Speed Focused
                </div>
                <div className="bg-garage-medium px-3 py-1 rounded-full text-garage-accent border border-garage-accent/30">
                  📊 Data Driven
                </div>
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-garage-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        <Link href="/basher-fleet" className="block group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-garage-dark to-garage-medium border border-red-500/30 hover:border-red-500 transition-all duration-300 transform hover:scale-105">
            {/* HD X-Maxx Monster Truck Background */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              />
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 z-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M20 20l-10-10v20l10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Content */}
            <div className="relative p-8 z-20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18,15H6L2,9H6L10,3H14L18,9H22M6.5,12H17.5L18.5,9H5.5M8,15V18H12V15M14,15V18H16V15"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white group-hover:text-red-400 transition-colors">
                    Basher Fleet
                  </h2>
                  <p className="text-red-400 font-semibold">X-Maxx Sunday</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Raw power meets pure chaos. Giant trucks, massive air, and the durability to survive it all.
              </p>
              
              {/* Stats bar */}
              <div className="flex space-x-4 text-sm">
                <div className="bg-garage-medium px-3 py-1 rounded-full text-red-400 border border-red-500/30">
                  💥 High Impact
                </div>
                <div className="bg-garage-medium px-3 py-1 rounded-full text-red-400 border border-red-500/30">
                  🔧 Build Ready
                </div>
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-garage-accent to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative text-center garage-card border border-garage-accent/30 hover:border-garage-accent transition-colors">
            <div className="text-4xl mb-2">🏗️</div>
            <div className="text-3xl font-bold text-garage-accent">2</div>
            <div className="text-gray-400 text-sm">Active Builds</div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-garage-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative text-center garage-card border border-red-500/30 hover:border-red-500 transition-colors">
            <div className="text-4xl mb-2">🏁</div>
            <div className="text-3xl font-bold text-red-400">15</div>
            <div className="text-gray-400 text-sm">Total Runs</div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-garage-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative text-center garage-card border border-blue-500/30 hover:border-blue-500 transition-colors">
            <div className="text-4xl mb-2">⚙️</div>
            <div className="text-3xl font-bold text-blue-400">8</div>
            <div className="text-gray-400 text-sm">Modifications</div>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-garage-accent rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative text-center garage-card border border-green-500/30 hover:border-green-500 transition-colors">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-3xl font-bold text-green-400">24</div>
            <div className="text-gray-400 text-sm">Records Set</div>
          </div>
        </div>
      </div>
    </div>
  )
}