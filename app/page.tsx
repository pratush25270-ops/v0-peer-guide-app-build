'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { OnboardingWizard } from '@/components/onboarding-wizard'
import { Dashboard } from '@/components/dashboard'
import { AppView, UserProfile } from '@/lib/types'

export default function Home() {
  const [view, setView] = useState<AppView>('landing')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setView('dashboard')
  }

  const handleLogout = () => {
    setUserProfile(null)
    setView('landing')
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('onboarding')} />
  }

  if (view === 'onboarding') {
    return (
      <OnboardingWizard
        onComplete={handleOnboardingComplete}
        onBack={() => setView('landing')}
      />
    )
  }

  if (view === 'dashboard' && userProfile) {
    return <Dashboard userProfile={userProfile} onLogout={handleLogout} />
  }

  return null
}
