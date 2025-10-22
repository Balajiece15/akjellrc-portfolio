interface PersonalBestCardProps {
  speed: number
}

export default function PersonalBestCard({ speed }: PersonalBestCardProps) {
  return (
    <div className="garage-card text-center max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white mb-2">Personal Best</h2>
        <div className="speed-display">{speed}</div>
        <div className="text-2xl text-gray-400 font-mono">MPH</div>
      </div>
      
      <div className="border-t border-garage-medium pt-4">
        <div className="text-sm text-gray-400">
          Set on: <span className="text-garage-accent">October 15, 2024</span>
        </div>
        <div className="text-sm text-gray-400">
          Vehicle: <span className="text-garage-accent">Arrma Limitless V1</span>
        </div>
      </div>
    </div>
  )
}