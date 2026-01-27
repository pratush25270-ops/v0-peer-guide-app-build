'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, GraduationCap, User, BookOpen, Target, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchableSelect } from '@/components/searchable-select'
import { OnboardingData, AcademicLevel, UserProfile } from '@/lib/types'
import { getCountries, getStates, getCities } from '@/data/countryData'
import { AGE_GROUPS, UNIVERSITIES, COURSES, ACADEMIC_GOALS } from '@/data/onboardingData'
import { cn } from '@/lib/utils'

interface OnboardingWizardProps {
  onComplete: (profile: UserProfile) => void
  onBack: () => void
}

const INITIAL_DATA: OnboardingData = {
  step: 1,
  personalDetails: {
    name: '',
    ageGroup: '',
    country: '',
    state: '',
    city: ''
  },
  academicProfile: {
    university: '',
    course: '',
    academicLevel: '',
    goals: [],
    bio: ''
  }
}

export function OnboardingWizard({ onComplete, onBack }: OnboardingWizardProps) {
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)
  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  // Update states when country changes
  useEffect(() => {
    if (data.personalDetails.country) {
      setStates(getStates(data.personalDetails.country))
      setData(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, state: '', city: '' }
      }))
    }
  }, [data.personalDetails.country])

  // Update cities when state changes
  useEffect(() => {
    if (data.personalDetails.country && data.personalDetails.state) {
      setCities(getCities(data.personalDetails.country, data.personalDetails.state))
      setData(prev => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, city: '' }
      }))
    }
  }, [data.personalDetails.state, data.personalDetails.country])

  const updatePersonalDetails = (field: keyof OnboardingData['personalDetails'], value: string) => {
    setData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }))
  }

  const updateAcademicProfile = (field: keyof OnboardingData['academicProfile'], value: string | string[]) => {
    setData(prev => ({
      ...prev,
      academicProfile: { ...prev.academicProfile, [field]: value }
    }))
  }

  const toggleGoal = (goal: string) => {
    setData(prev => {
      const goals = prev.academicProfile.goals.includes(goal)
        ? prev.academicProfile.goals.filter(g => g !== goal)
        : [...prev.academicProfile.goals, goal]
      return { ...prev, academicProfile: { ...prev.academicProfile, goals } }
    })
  }

  const isStep1Valid = () => {
    const { name, ageGroup, country, state, city } = data.personalDetails
    return name.trim() && ageGroup && country && state && city
  }

  const isStep2Valid = () => {
    const { university, course, academicLevel, goals, bio } = data.academicProfile
    return university && course && academicLevel && goals.length > 0 && bio.trim()
  }

  const handleComplete = () => {
    const profile: UserProfile = {
      id: 'user-' + Date.now(),
      name: data.personalDetails.name,
      ageGroup: data.personalDetails.ageGroup,
      country: data.personalDetails.country,
      state: data.personalDetails.state,
      city: data.personalDetails.city,
      university: data.academicProfile.university,
      course: data.academicProfile.course,
      academicLevel: data.academicProfile.academicLevel as AcademicLevel,
      goals: data.academicProfile.goals,
      bio: data.academicProfile.bio
    }
    onComplete(profile)
  }

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <nav className="flex items-center justify-between p-6 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/20 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-sky-400" />
            </div>
            <span className="text-2xl font-bold text-white">PeerGuide</span>
          </div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </nav>

        {/* Wizard Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <StepIndicator
                number={1}
                label="Personal"
                icon={<User className="w-5 h-5" />}
                isActive={data.step === 1}
                isCompleted={data.step > 1}
              />
              <div className={cn('w-24 h-0.5 rounded-full', data.step > 1 ? 'bg-sky-500' : 'bg-slate-700')} />
              <StepIndicator
                number={2}
                label="Academic"
                icon={<BookOpen className="w-5 h-5" />}
                isActive={data.step === 2}
                isCompleted={false}
              />
            </div>

            {/* Form Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              {data.step === 1 ? (
                <Step1PersonalDetails
                  data={data.personalDetails}
                  states={states}
                  cities={cities}
                  onUpdate={updatePersonalDetails}
                />
              ) : (
                <Step2AcademicProfile
                  data={data.academicProfile}
                  onUpdate={updateAcademicProfile}
                  onToggleGoal={toggleGoal}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                {data.step > 1 ? (
                  <Button
                    variant="ghost"
                    onClick={() => setData(prev => ({ ...prev, step: prev.step - 1 }))}
                    className="text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {data.step === 1 ? (
                  <Button
                    onClick={() => setData(prev => ({ ...prev, step: 2 }))}
                    disabled={!isStep1Valid()}
                    className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    disabled={!isStep2Valid()}
                    className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Find My Peers
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  number: number
  label: string
  icon: React.ReactNode
  isActive: boolean
  isCompleted: boolean
}

function StepIndicator({ label, icon, isActive, isCompleted }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
          isActive && 'bg-sky-500 text-white shadow-lg shadow-sky-500/30',
          isCompleted && 'bg-sky-500/20 text-sky-400',
          !isActive && !isCompleted && 'bg-slate-800 text-slate-500'
        )}
      >
        {isCompleted ? <Check className="w-5 h-5" /> : icon}
      </div>
      <span className={cn('text-sm font-medium', isActive ? 'text-white' : 'text-slate-500')}>
        {label}
      </span>
    </div>
  )
}

interface Step1Props {
  data: OnboardingData['personalDetails']
  states: string[]
  cities: string[]
  onUpdate: (field: keyof OnboardingData['personalDetails'], value: string) => void
}

function Step1PersonalDetails({ data, states, cities, onUpdate }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Personal Details</h2>
        <p className="text-slate-400">Tell us a bit about yourself so we can find the best matches.</p>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Full Name</label>
        <input
          type="text"
          value={data.name}
          onChange={e => onUpdate('name', e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50"
        />
      </div>

      {/* Age Group */}
      <SearchableSelect
        label="Age Group"
        options={AGE_GROUPS}
        value={data.ageGroup}
        onChange={v => onUpdate('ageGroup', v)}
        placeholder="Select your age group"
      />

      {/* Location */}
      <div className="grid md:grid-cols-3 gap-4">
        <SearchableSelect
          label="Country"
          options={getCountries()}
          value={data.country}
          onChange={v => onUpdate('country', v)}
          placeholder="Select country"
        />
        <SearchableSelect
          label="State"
          options={states}
          value={data.state}
          onChange={v => onUpdate('state', v)}
          placeholder="Select state"
          disabled={!data.country}
        />
        <SearchableSelect
          label="City"
          options={cities}
          value={data.city}
          onChange={v => onUpdate('city', v)}
          placeholder="Select city"
          disabled={!data.state}
        />
      </div>
    </div>
  )
}

interface Step2Props {
  data: OnboardingData['academicProfile']
  onUpdate: (field: keyof OnboardingData['academicProfile'], value: string | string[]) => void
  onToggleGoal: (goal: string) => void
}

function Step2AcademicProfile({ data, onUpdate, onToggleGoal }: Step2Props) {
  const academicLevels = Object.values(AcademicLevel)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Academic Profile</h2>
        <p className="text-slate-400">Help us understand your academic background and goals.</p>
      </div>

      {/* University & Course */}
      <div className="grid md:grid-cols-2 gap-4">
        <SearchableSelect
          label="University"
          options={UNIVERSITIES}
          value={data.university}
          onChange={v => onUpdate('university', v)}
          placeholder="Search university..."
        />
        <SearchableSelect
          label="Field of Study"
          options={COURSES}
          value={data.course}
          onChange={v => onUpdate('course', v)}
          placeholder="Search course..."
        />
      </div>

      {/* Academic Level */}
      <SearchableSelect
        label="Academic Level"
        options={academicLevels}
        value={data.academicLevel}
        onChange={v => onUpdate('academicLevel', v)}
        placeholder="Select your level"
      />

      {/* Goals */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Academic Goals (Select multiple)</label>
        <div className="flex flex-wrap gap-2">
          {ACADEMIC_GOALS.map(goal => (
            <button
              key={goal}
              type="button"
              onClick={() => onToggleGoal(goal)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                data.goals.includes(goal)
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              )}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">About You</label>
        <textarea
          value={data.bio}
          onChange={e => onUpdate('bio', e.target.value)}
          placeholder="Tell potential peers about yourself, your interests, and what you're looking for..."
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 resize-none"
        />
      </div>
    </div>
  )
}
