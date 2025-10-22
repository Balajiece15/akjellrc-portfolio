interface SpecSheetProps {
  specs: Record<string, string>
}

export default function SpecSheet({ specs }: SpecSheetProps) {
  return (
    <div className="garage-card">
      <h3 className="text-xl font-semibold text-white mb-4">Specifications</h3>
      <div className="space-y-3">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center border-b border-garage-medium pb-2">
            <span className="text-gray-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}