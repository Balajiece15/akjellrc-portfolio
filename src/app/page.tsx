import Link from 'next/link'
import PersonalBestCard from '@/components/PersonalBestCard'
import SectionCard from '@/components/SectionCard'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-garage-dark via-garage-medium to-garage-light">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Racing Flag Animation */}
        <div className="absolute top-10 right-10 text-6xl animate-pulse">🏁</div>
        <div className="absolute bottom-10 left-10 text-4xl animate-bounce">⚡</div>
        
        {/* Hero Content */}
        <div className="relative text-center mb-16 py-12">
          <div className="inline-flex items-center space-x-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-garage-accent to-red-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🏎️</span>
            </div>
            <h1 className="text-8xl font-black text-white tracking-tight bg-gradient-to-r from-white via-garage-accent to-white bg-clip-text text-transparent">
              AkjellRC
            </h1>
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-garage-accent rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl">🚀</span>
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
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Content */}
            <div className="relative p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  ⚡
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
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M20 20l-10-10v20l10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            {/* Content */}
            <div className="relative p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  🚛
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