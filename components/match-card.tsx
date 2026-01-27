'use client'

import { User, MessageCircle, GraduationCap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PeerMatch, UserRole } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MatchCardProps {
  match: PeerMatch
  onViewProfile: (match: PeerMatch) => void
  onConnect: (match: PeerMatch) => void
}

export function MatchCard({ match, onViewProfile, onConnect }: MatchCardProps) {
  const roleConfig = {
    [UserRole.MENTOR]: {
      label: 'Mentor',
      bgColor: 'bg-amber-500/20',
      textColor: 'text-amber-400',
      borderColor: 'border-t-amber-500'
    },
    [UserRole.SENIOR]: {
      label: 'Senior',
      bgColor: 'bg-indigo-500/20',
      textColor: 'text-indigo-400',
      borderColor: 'border-t-indigo-500'
    },
    [UserRole.PEER]: {
      label: 'Peer',
      bgColor: 'bg-sky-500/20',
      textColor: 'text-sky-400',
      borderColor: 'border-t-sky-500'
    }
  }

  const config = roleConfig[match.role]

  return (
    <div className={cn(
      'bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:border-slate-600',
      'border-t-4',
      config.borderColor
    )}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {match.avatar || match.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-semibold text-white truncate">{match.name}</h3>
              <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', config.bgColor, config.textColor)}>
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
              <GraduationCap className="w-4 h-4" />
              <span className="truncate">{match.university}</span>
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
          <span className="px-2 py-1 bg-slate-700/50 rounded-lg">{match.course}</span>
          <span className="px-2 py-1 bg-slate-700/50 rounded-lg">{match.academicLevel}</span>
        </div>

        {/* Bio */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{match.bio}</p>

        {/* Goals */}
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <div className="flex flex-wrap gap-1">
            {match.goals.slice(0, 3).map(goal => (
              <span key={goal} className="px-2 py-0.5 bg-sky-500/10 text-sky-400 rounded-full text-xs">
                {goal}
              </span>
            ))}
            {match.goals.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full text-xs">
                +{match.goals.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onViewProfile(match)}
            className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button
            onClick={() => onConnect(match)}
            className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </div>
    </div>
  )
}
