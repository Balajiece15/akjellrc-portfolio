interface SectionCardProps {
  title: string
  subtitle: string
  description: string
  imageAlt: string
  accent: 'orange' | 'red'
}

export default function SectionCard({ 
  title, 
  subtitle, 
  description, 
  imageAlt,
  accent 
}: SectionCardProps) {
  const accentClass = accent === 'orange' ? 'hover:border-garage-accent' : 'hover:border-red-500'
  const shadowClass = accent === 'orange' ? 'hover:shadow-garage-accent/20' : 'hover:shadow-red-500/20'

  return (
    <div className={`garage-card h-full ${accentClass} ${shadowClass} cursor-pointer transform hover:scale-105 transition-all duration-300`}>
      <div className="h-48 bg-gradient-to-br from-garage-medium to-garage-light rounded-lg mb-6 flex items-center justify-center">
        <div className="text-6xl text-gray-600">
          {accent === 'orange' ? '🏎️' : '🚙'}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="subtitle">{subtitle}</p>
        </div>
        
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
        
        <div className="pt-4">
          <div className={`inline-flex items-center text-sm font-medium ${
            accent === 'orange' ? 'text-garage-accent' : 'text-red-500'
          }`}>
            Explore →
          </div>
        </div>
      </div>
    </div>
  )
}