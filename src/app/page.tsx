import Link from 'next/link'
import PersonalBestCard from '@/components/PersonalBestCard'
import SectionCard from '@/components/SectionCard'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
          AkjellRC
        </h1>
        <p className="text-2xl text-gray-300 font-light">
          Digital Garage & Speed Log
        </p>
      </div>

      {/* Personal Best Section */}
      <div className="mb-16 flex justify-center">
        <PersonalBestCard speed={120} />
      </div>

      {/* Main Navigation Sections */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link href="/speed-run-garage" className="block">
          <SectionCard
            title="Speed Run Garage"
            subtitle="The Pursuit of Speed"
            description="Precision-engineered vehicles built for breaking barriers. Every modification calculated, every run measured."
            imageAlt="Speed Run Garage"
            accent="orange"
          />
        </Link>

        <Link href="/basher-fleet" className="block">
          <SectionCard
            title="Basher Fleet"
            subtitle="X-Maxx Sunday"
            description="Raw power meets pure chaos. Giant trucks, massive air, and the durability to survive it all."
            imageAlt="Basher Fleet"
            accent="red"
          />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center garage-card">
          <div className="text-3xl font-bold text-garage-accent">2</div>
          <div className="text-gray-400">Active Builds</div>
        </div>
        <div className="text-center garage-card">
          <div className="text-3xl font-bold text-garage-accent">120</div>
          <div className="text-gray-400">MPH Personal Best</div>
        </div>
        <div className="text-center garage-card">
          <div className="text-3xl font-bold text-garage-accent">8S</div>
          <div className="text-gray-400">Max LiPo Config</div>
        </div>
        <div className="text-center garage-card">
          <div className="text-3xl font-bold text-garage-accent">∞</div>
          <div className="text-gray-400">Fun Factor</div>
        </div>
      </div>
    </div>
  )
}