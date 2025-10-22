'use client'

import { useState } from 'react'
import SpecSheet from '@/components/SpecSheet'
import SpeedLog from '@/components/SpeedLog'
import VideoGallery from '@/components/VideoGallery'

export default function SpeedRunGarage() {
  const limitlessSpecs = {
    'Motor': 'Spektrum 6S Brushless System',
    'Chassis': 'Carbon Fiber Monocoque',
    'Body': 'RAZ1 Aerodynamic Shell',
    'Gyro': 'Futaba GYC441 (Precision Steering)',
    'Drivetrain': 'AWD with Center Differential',
    'Gearing': '11T/54T (Speed Optimized)',
    'Weight': '7.2 lbs (3.3 kg)',
    'Length': '23.6" (600mm)',
    'Width': '12.2" (310mm)',
    'Power': '6S LiPo (22.2V)'
  }

  // Filtered videos - only @akjellrc channel
  const videos = [
    {
      id: 'nBz7k3K_pSE',
      title: 'Arrma Limitless V1 - Speed Run Session',
      channel: '@akjellrc',
      duration: '2:45'
    },
    {
      id: 'vKGInkCBAhc',
      title: 'RC Speed Testing - High Performance Run',
      channel: '@akjellrc',
      duration: '3:12'
    },
    {
      id: 'MZAq_5KbGrs',
      title: 'Limitless V1 - Track Performance',
      channel: '@akjellrc',
      duration: '1:58'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-garage-dark via-orange-900/20 to-garage-medium py-16">
        {/* High-Quality Speed Track Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/rc-4718649_1280.jpg)'
            }}
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-6xl font-black text-white mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Speed Run Garage
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            The Pursuit of Speed
          </p>
          
          <div className="flex justify-center space-x-6">
            <div className="bg-garage-medium border-2 border-orange-500 px-6 py-3 rounded-full text-orange-400 font-bold shadow-lg">
              🏆 120 MPH Record
            </div>
            <div className="bg-garage-medium border-2 border-red-500 px-6 py-3 rounded-full text-red-400 font-bold shadow-lg">
              ⚡ Limitless V1
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Speed Log Section - MOVED UP */}
        <div className="garage-card">
          <h2 className="text-3xl font-bold text-white mb-6">🏁 Speed Runs & Personal Bests</h2>
          <SpeedLog />
        </div>

        {/* Ready for Action Section - WITH CONTENT */}
        <div className="garage-card relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: 'url(/images/rc-1-8-5288099_1280.jpg)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-garage-dark/90 via-garage-dark/95 to-garage-dark/85" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Ready for Action - Speed Run Configuration
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Configuration Details */}
              <div className="space-y-6">
                <div className="bg-garage-medium/80 rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">⚡ Current Setup</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Power:</span>
                      <p className="text-white font-bold">6S LiPo Setup</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Gearing:</span>
                      <p className="text-white font-bold">11T/54T Optimized</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Stability:</span>
                      <p className="text-white font-bold">Futaba GYC441</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Aerodynamics:</span>
                      <p className="text-white font-bold">RAZ1 Body</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-garage-medium/80 rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-4">🎯 Performance Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current PB:</span>
                      <span className="text-green-400 font-bold">120 MPH ✓</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Target Speed:</span>
                      <span className="text-yellow-400 font-bold">125+ MPH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Track Condition:</span>
                      <span className="text-blue-400 font-bold">Optimal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Action Videos */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-garage-accent mb-4">📹 Live Action</h3>
                {videos.slice(0, 2).map((video, index) => (
                  <div key={video.id} className="bg-garage-medium rounded-lg p-3">
                    <div className="aspect-video mb-2">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                    <p className="text-garage-accent text-sm">{video.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Car Specifications */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="garage-card">
            <h2 className="text-3xl font-bold text-white mb-6">Arrma Limitless V1</h2>
            <SpecSheet specs={limitlessSpecs} />
          </div>
          
          <div className="garage-card">
            <h2 className="text-3xl font-bold text-white mb-6">Video Gallery</h2>
            <VideoGallery videos={videos} />
          </div>
        </div>

        {/* Story Section */}
        <div className="garage-card">
          <h2 className="text-2xl font-bold text-white mb-6">The Story</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            This isn&apos;t just about going fast; it&apos;s a battle against physics. The &apos;Speed Run Garage&apos; is the lab where engineering meets raw power. It&apos;s the story of the Arrma Limitless V1, a machine honed for one purpose: to break barriers. From installing the precision Futaba GYC441 gyro for locked-in stability to sculpting the air with RAZ1 aerodynamics, every modification is a calculated step toward the next personal best. This is the relentless pursuit of 120 mph and beyond, one high-voltage pass at a time.
          </p>
        </div>
      </div>
    </div>
  )
}