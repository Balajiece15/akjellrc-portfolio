'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/speed-run-garage', label: 'Speed Run Garage' },
    { href: '/basher-fleet', label: 'Basher Fleet' },
    { href: '/admin', label: 'Admin' },
  ]

  return (
    <nav className="bg-garage-dark border-b border-garage-medium sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-garage-accent">
            AkjellRC
          </Link>
          
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-garage-accent bg-garage-medium'
                    : 'text-gray-300 hover:text-garage-accent hover:bg-garage-medium'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}