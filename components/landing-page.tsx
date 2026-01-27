'use client'

import React from "react"

import { GraduationCap, Users, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400 rounded-full opacity-10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/20 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-sky-400" />
            </div>
            <span className="text-2xl font-bold text-white">PeerGuide</span>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-300">AI-Powered Academic Networking</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Find Your </span>
              <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Academic Tribe
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with peers, seniors, and mentors who share your academic journey. 
              Get guidance, collaborate on projects, and build meaningful relationships 
              that help you succeed.
            </p>

            {/* CTA Button */}
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10k+</div>
                <div className="text-slate-400 text-sm">Active Students</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-slate-400 text-sm">Universities</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-slate-400 text-sm">Countries</div>
              </div>
            </div>
          </div>
        </main>

        {/* Feature Cards */}
        <div className="px-6 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Peer Matching"
              description="Find classmates studying the same subjects and working towards similar goals."
              color="sky"
            />
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Senior Guidance"
              description="Connect with seniors who have walked your path and can offer valuable insights."
              color="indigo"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Expert Mentors"
              description="Get guidance from mentors with industry experience and academic expertise."
              color="amber"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: 'sky' | 'indigo' | 'amber'
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  }

  const iconBgClasses = {
    sky: 'bg-sky-500/20 text-sky-400',
    indigo: 'bg-indigo-500/20 text-indigo-400',
    amber: 'bg-amber-500/20 text-amber-400'
  }

  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${colorClasses[color]}`}>
      <div className={`inline-flex p-3 rounded-xl mb-4 ${iconBgClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
