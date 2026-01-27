export enum UserRole {
  PEER = 'peer',
  SENIOR = 'senior',
  MENTOR = 'mentor'
}

export enum AcademicLevel {
  HIGH_SCHOOL = 'High School',
  UNDERGRADUATE = 'Undergraduate',
  GRADUATE = 'Graduate',
  MASTERS = 'Masters',
  PHD = 'PhD',
  ALUMNI = 'Alumni'
}

export interface UserProfile {
  id: string
  name: string
  ageGroup: string
  country: string
  state: string
  city: string
  university: string
  course: string
  academicLevel: AcademicLevel
  goals: string[]
  bio: string
  isMentor?: boolean
  avatar?: string
}

export interface PeerMatch extends UserProfile {
  role: UserRole
  matchScore: number
  matchReasons: string[]
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
  isMe: boolean
}

export interface ChatState {
  peerId: string
  messages: Message[]
  isOnline: boolean
}

export type AppView = 'landing' | 'onboarding' | 'dashboard'

export interface OnboardingData {
  step: number
  personalDetails: {
    name: string
    ageGroup: string
    country: string
    state: string
    city: string
  }
  academicProfile: {
    university: string
    course: string
    academicLevel: AcademicLevel | ''
    goals: string[]
    bio: string
  }
}
