'use client'

import { X, GraduationCap, MapPin, Target, MessageCircle, Sparkles, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PeerMatch, UserProfile, UserRole } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProfileModalProps {
  peer: PeerMatch
  userProfile: UserProfile
  onClose: () => void
  onConnect: () => void
}

export function ProfileModal({ peer, userProfile, onClose, onConnect }: ProfileModalProps) {
  const roleConfig = {
    [UserRole.MENTOR]: {
      label: 'Mentor',
      icon: <Sparkles className="w-4 h-4" />,
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-500/20',
      textColor: 'text-amber-400'
    },
    [UserRole.SENIOR]: {
      label: 'Senior',
      icon: <Award className="w-4 h-4" />,
      gradient: 'from-indigo-500 to-purple-500',
      bgLight: 'bg-indigo-500/20',
      textColor: 'text-indigo-400'
    },
    [UserRole.PEER]: {
      label: 'Peer',
      icon: <Users className="w-4 h-4" />,
      gradient: 'from-sky-500 to-cyan-500',
      bgLight: 'bg-sky-500/20',
      textColor: 'text-sky-400'
    }
  }

  const config = roleConfig[peer.role]

  // Generate match reasons explanation
  const getMatchExplanation = () => {
    const reasons: string[] = []
    
    if (peer.course === userProfile.course) {
      reasons.push(`You both study ${peer.course}`)
    }
    
    if (peer.city === userProfile.city) {
      reasons.push(`Both based in ${peer.city}`)
    } else if (peer.country === userProfile.country) {
      reasons.push(`Both from ${peer.country}`)
    }
    
    const sharedGoals = userProfile.goals.filter(g => peer.goals.includes(g))
    if (sharedGoals.length > 0) {
      reasons.push(`Share ${sharedGoals.length} academic goal${sharedGoals.length > 1 ? 's' : ''}: ${sharedGoals.slice(0, 2).join(', ')}${sharedGoals.length > 2 ? '...' : ''}`)
    }
    
    if (peer.isMentor) {
      reasons.push('Verified mentor with experience helping students')
    }
    
    if (peer.university === userProfile.university) {
      reasons.push('Same university')
    }
    
    return reasons
  }

  const matchReasons = getMatchExplanation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header with gradient */}
        <div className={cn('h-32 bg-gradient-to-r relative', config.gradient)}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar */}
        <div className="relative px-6 -mt-12">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 border-4 border-slate-800 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
            {peer.avatar || peer.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          {/* Name & Role */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">{peer.name}</h2>
            <span className={cn('flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium', config.bgLight, config.textColor)}>
              {config.icon}
              {config.label}
            </span>
          </div>

          {/* Academic Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <GraduationCap className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="font-medium">{peer.university}</div>
                <div className="text-sm text-slate-400">{peer.course} - {peer.academicLevel}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <MapPin className="w-5 h-5 text-sky-400" />
              </div>
              <div>{peer.city}, {peer.state}, {peer.country}</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-400 mb-2">About</h3>
            <p className="text-slate-300 leading-relaxed">{peer.bio}</p>
          </div>

          {/* Goals */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-3">
              <Target className="w-4 h-4" />
              Academic Goals
            </h3>
            <div className="flex flex-wrap gap-2">
              {peer.goals.map(goal => {
                const isShared = userProfile.goals.includes(goal)
                return (
                  <span
                    key={goal}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-sm font-medium',
                      isShared
                        ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30'
                        : 'bg-slate-700/50 text-slate-400'
                    )}
                  >
                    {goal}
                    {isShared && ' (Shared)'}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Why You Matched */}
          {matchReasons.length > 0 && (
            <div className="mb-6 p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl">
              <h3 className="flex items-center gap-2 text-sm font-medium text-sky-400 mb-3">
                <Sparkles className="w-4 h-4" />
                Why You Matched
              </h3>
              <ul className="space-y-2">
                {matchReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl"
            >
              Close
            </Button>
            <Button
              onClick={onConnect}
              className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
