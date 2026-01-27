'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { GraduationCap, Search, Filter, Users, Award, Sparkles, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MatchCard } from '@/components/match-card'
import { ChatPanel } from '@/components/chat-panel'
import { ProfileModal } from '@/components/profile-modal'
import { findMatches } from '@/services/matchingService'
import { UserProfile, PeerMatch, UserRole } from '@/lib/types'
import { cn } from '@/lib/utils'

interface DashboardProps {
  userProfile: UserProfile
  onLogout: () => void
}

type FilterType = 'all' | UserRole

export function Dashboard({ userProfile, onLogout }: DashboardProps) {
  const [matches, setMatches] = useState<PeerMatch[]>([])
  const [filteredMatches, setFilteredMatches] = useState<PeerMatch[]>([])
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeer, setSelectedPeer] = useState<PeerMatch | null>(null)
  const [profilePeer, setProfilePeer] = useState<PeerMatch | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const foundMatches = findMatches(userProfile)
    setMatches(foundMatches)
    setFilteredMatches(foundMatches)
  }, [userProfile])

  useEffect(() => {
    let filtered = matches

    // Apply role filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(m => m.role === activeFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        m =>
          m.name.toLowerCase().includes(query) ||
          m.university.toLowerCase().includes(query) ||
          m.course.toLowerCase().includes(query) ||
          m.goals.some(g => g.toLowerCase().includes(query))
      )
    }

    setFilteredMatches(filtered)
  }, [activeFilter, searchQuery, matches])

  const handleConnect = (peer: PeerMatch) => {
    setSelectedPeer(peer)
    setIsChatOpen(true)
  }

  const filterCounts = {
    all: matches.length,
    [UserRole.PEER]: matches.filter(m => m.role === UserRole.PEER).length,
    [UserRole.SENIOR]: matches.filter(m => m.role === UserRole.SENIOR).length,
    [UserRole.MENTOR]: matches.filter(m => m.role === UserRole.MENTOR).length
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 rounded-xl">
                <GraduationCap className="w-6 h-6 text-sky-400" />
              </div>
              <span className="text-xl font-bold text-white">PeerGuide</span>
            </div>

            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-medium text-sm">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">{userProfile.name}</div>
                  <div className="text-slate-400 text-xs">{userProfile.university}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {userProfile.name.split(' ')[0]}!
              </h1>
              <p className="text-slate-400">
                We found <span className="text-sky-400 font-semibold">{matches.length} matches</span> based on your
                profile.
              </p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, university, course, or goals..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700">
                <FilterButton
                  label="All"
                  count={filterCounts.all}
                  icon={<Filter className="w-4 h-4" />}
                  isActive={activeFilter === 'all'}
                  onClick={() => setActiveFilter('all')}
                />
                <FilterButton
                  label="Peers"
                  count={filterCounts[UserRole.PEER]}
                  icon={<Users className="w-4 h-4" />}
                  isActive={activeFilter === UserRole.PEER}
                  onClick={() => setActiveFilter(UserRole.PEER)}
                  color="sky"
                />
                <FilterButton
                  label="Seniors"
                  count={filterCounts[UserRole.SENIOR]}
                  icon={<Award className="w-4 h-4" />}
                  isActive={activeFilter === UserRole.SENIOR}
                  onClick={() => setActiveFilter(UserRole.SENIOR)}
                  color="indigo"
                />
                <FilterButton
                  label="Mentors"
                  count={filterCounts[UserRole.MENTOR]}
                  icon={<Sparkles className="w-4 h-4" />}
                  isActive={activeFilter === UserRole.MENTOR}
                  onClick={() => setActiveFilter(UserRole.MENTOR)}
                  color="amber"
                />
              </div>
            </div>

            {/* Match Grid */}
            {filteredMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMatches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onViewProfile={setProfilePeer}
                    onConnect={handleConnect}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No matches found</h3>
                <p className="text-slate-400">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>

          {/* Chat Panel - Desktop */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="sticky top-24">
              <ChatPanel
                selectedPeer={selectedPeer}
                userProfile={userProfile}
                onClose={() => setSelectedPeer(null)}
                isDesktop
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Chat Drawer */}
      {isChatOpen && selectedPeer && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsChatOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-full max-w-md">
            <ChatPanel
              selectedPeer={selectedPeer}
              userProfile={userProfile}
              onClose={() => {
                setIsChatOpen(false)
                setSelectedPeer(null)
              }}
            />
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profilePeer && (
        <ProfileModal
          peer={profilePeer}
          userProfile={userProfile}
          onClose={() => setProfilePeer(null)}
          onConnect={() => {
            handleConnect(profilePeer)
            setProfilePeer(null)
          }}
        />
      )}
    </div>
  )
}

interface FilterButtonProps {
  label: string
  count: number
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
  color?: 'sky' | 'indigo' | 'amber'
}

function FilterButton({ label, count, icon, isActive, onClick, color }: FilterButtonProps) {
  const activeColors = {
    sky: 'bg-sky-500 text-white',
    indigo: 'bg-indigo-500 text-white',
    amber: 'bg-amber-500 text-white'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
        isActive
          ? color
            ? activeColors[color]
            : 'bg-slate-700 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className={cn('px-1.5 py-0.5 rounded text-xs', isActive ? 'bg-white/20' : 'bg-slate-700')}>
        {count}
      </span>
    </button>
  )
}
