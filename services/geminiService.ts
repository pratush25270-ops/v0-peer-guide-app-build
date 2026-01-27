import { UserProfile, PeerMatch } from '@/lib/types'

export async function generateIcebreaker(
  userProfile: UserProfile,
  peerProfile: PeerMatch
): Promise<string> {
  const prompt = `You are helping a student start a conversation with a potential academic peer/mentor. Generate a friendly, polite, and academic conversation starter (2 sentences max).

User Profile:
- Name: ${userProfile.name}
- University: ${userProfile.university}
- Course: ${userProfile.course}
- Academic Level: ${userProfile.academicLevel}
- Goals: ${userProfile.goals.join(', ')}
- Bio: ${userProfile.bio}

Peer Profile:
- Name: ${peerProfile.name}
- Role: ${peerProfile.role}
- University: ${peerProfile.university}
- Course: ${peerProfile.course}
- Academic Level: ${peerProfile.academicLevel}
- Goals: ${peerProfile.goals.join(', ')}
- Bio: ${peerProfile.bio}

Shared interests/goals: ${userProfile.goals.filter(g => peerProfile.goals.includes(g)).join(', ') || 'None identified'}

Generate a conversation starter that:
1. Is warm and professional
2. References a shared interest or the peer's expertise
3. Asks a specific question to encourage response
4. Is no longer than 2 sentences

Respond with ONLY the icebreaker message, no quotes or additional text.`

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      throw new Error('Failed to generate icebreaker')
    }

    const data = await response.json()
    return data.text
  } catch (error) {
    console.error('[v0] Error generating icebreaker:', error)
    // Fallback icebreaker
    const sharedGoals = userProfile.goals.filter(g => peerProfile.goals.includes(g))
    if (sharedGoals.length > 0) {
      return `Hi ${peerProfile.name}! I noticed we're both interested in ${sharedGoals[0]}. I'd love to hear about your experience with it at ${peerProfile.university}.`
    }
    return `Hi ${peerProfile.name}! I'm ${userProfile.name}, studying ${userProfile.course}. I'd love to connect and learn more about your journey in ${peerProfile.course}.`
  }
}
