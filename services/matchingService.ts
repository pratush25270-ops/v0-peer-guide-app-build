import { UserProfile, PeerMatch, UserRole, AcademicLevel } from '@/lib/types'
import { MOCK_PEERS } from '@/data/onboardingData'

const ACADEMIC_LEVEL_ORDER: AcademicLevel[] = [
  AcademicLevel.HIGH_SCHOOL,
  AcademicLevel.UNDERGRADUATE,
  AcademicLevel.GRADUATE,
  AcademicLevel.MASTERS,
  AcademicLevel.PHD,
  AcademicLevel.ALUMNI
]

function getAcademicLevelIndex(level: AcademicLevel): number {
  return ACADEMIC_LEVEL_ORDER.indexOf(level)
}

function determineRole(userLevel: AcademicLevel, peerLevel: AcademicLevel, isMentor?: boolean): UserRole {
  if (isMentor) return UserRole.MENTOR
  
  const userIndex = getAcademicLevelIndex(userLevel)
  const peerIndex = getAcademicLevelIndex(peerLevel)
  
  if (peerIndex > userIndex) return UserRole.SENIOR
  return UserRole.PEER
}

function calculateMatchScore(user: UserProfile, peer: UserProfile): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []
  
  // +40 points: Exact Course match
  if (user.course === peer.course) {
    score += 40
    reasons.push(`Studies ${peer.course} like you`)
  }
  
  // +20 points: Exact City match
  if (user.city === peer.city) {
    score += 20
    reasons.push(`Based in ${peer.city}`)
  }
  
  // +10 points: Country match
  if (user.country === peer.country) {
    score += 10
    reasons.push(`Also from ${peer.country}`)
  }
  
  // +10 points: Role seniority (if senior)
  const userIndex = getAcademicLevelIndex(user.academicLevel)
  const peerIndex = getAcademicLevelIndex(peer.academicLevel)
  if (peerIndex > userIndex) {
    score += 10
    reasons.push('More experienced in academics')
  }
  
  // +15 points: If peer is a Mentor
  if (peer.isMentor) {
    score += 15
    reasons.push('Verified mentor')
  }
  
  // +5 points per matching goal
  const matchingGoals = user.goals.filter(g => peer.goals.includes(g))
  if (matchingGoals.length > 0) {
    score += matchingGoals.length * 5
    reasons.push(`Shares ${matchingGoals.length} goal${matchingGoals.length > 1 ? 's' : ''} with you`)
  }
  
  // +5 points: Same university
  if (user.university === peer.university) {
    score += 5
    reasons.push('Same university')
  }
  
  return { score, reasons }
}

export function findMatches(userProfile: UserProfile): PeerMatch[] {
  const matches: PeerMatch[] = MOCK_PEERS
    .filter(peer => peer.id !== userProfile.id) // Exclude self
    .map(peer => {
      const { score, reasons } = calculateMatchScore(userProfile, peer)
      const role = determineRole(userProfile.academicLevel, peer.academicLevel, peer.isMentor)
      
      return {
        ...peer,
        role,
        matchScore: score,
        matchReasons: reasons
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore) // Sort by score descending
  
  return matches
}

export function getTopMatches(userProfile: UserProfile, count: number = 10): PeerMatch[] {
  return findMatches(userProfile).slice(0, count)
}
