'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, Loader2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateIcebreaker } from '@/services/geminiService'
import { UserProfile, PeerMatch, UserRole, Message } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ChatPanelProps {
  selectedPeer: PeerMatch | null
  userProfile: UserProfile
  onClose: () => void
  isDesktop?: boolean
}

const AUTO_REPLIES = [
  "That's a great question! I'd be happy to discuss that.",
  "Thanks for reaching out! I'm always excited to connect with fellow students.",
  "Interesting perspective! I've been thinking about something similar lately.",
  "Sure, I'd love to help with that. Let me share my experience...",
  "That's exactly what got me interested in this field too!"
]

export function ChatPanel({ selectedPeer, userProfile, onClose, isDesktop = false }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset messages when peer changes
    setMessages([])
    setInputValue('')
  }, [selectedPeer?.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim() || !selectedPeer) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: userProfile.id,
      text: text.trim(),
      timestamp: new Date(),
      isMe: true
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // Simulate auto-reply after 1.5s
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedPeer.id,
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        timestamp: new Date(),
        isMe: false
      }
      setMessages(prev => [...prev, reply])
    }, 1500)
  }

  const handleGenerateIcebreaker = async () => {
    if (!selectedPeer) return

    setIsGenerating(true)
    try {
      const icebreaker = await generateIcebreaker(userProfile, selectedPeer)
      setInputValue(icebreaker)
    } catch (error) {
      console.error('[v0] Failed to generate icebreaker:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const roleColors = {
    [UserRole.MENTOR]: 'from-amber-500 to-orange-500',
    [UserRole.SENIOR]: 'from-indigo-500 to-purple-500',
    [UserRole.PEER]: 'from-sky-500 to-cyan-500'
  }

  if (!selectedPeer) {
    return (
      <div className={cn(
        'bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl h-[600px] flex flex-col items-center justify-center p-8',
        !isDesktop && 'h-full'
      )}>
        <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-4">
          <Send className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Start a Conversation</h3>
        <p className="text-slate-400 text-center text-sm">
          Select a peer from your matches to begin chatting
        </p>
      </div>
    )
  }

  return (
    <div className={cn(
      'bg-slate-800 border border-slate-700 rounded-2xl flex flex-col overflow-hidden',
      isDesktop ? 'h-[600px]' : 'h-full'
    )}>
      {/* Header */}
      <div className={cn(
        'p-4 border-b border-slate-700 bg-gradient-to-r',
        roleColors[selectedPeer.role]
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
              {selectedPeer.avatar || selectedPeer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-white">{selectedPeer.name}</h3>
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <Circle className="w-2 h-2 fill-green-400 text-green-400" />
                <span>Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-slate-400 text-sm mb-4">
              Start your conversation with {selectedPeer.name.split(' ')[0]}
            </p>
            <Button
              variant="outline"
              onClick={handleGenerateIcebreaker}
              disabled={isGenerating}
              className="bg-transparent border-sky-500/50 text-sky-400 hover:bg-sky-500/10 hover:border-sky-500 rounded-xl"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Generate Smart Icebreaker
            </Button>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={cn('flex', message.isMe ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[80%] px-4 py-3 rounded-2xl',
                  message.isMe
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-br-md'
                    : 'bg-slate-700 text-white rounded-bl-md'
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={cn(
                    'text-xs mt-1',
                    message.isMe ? 'text-white/70' : 'text-slate-400'
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        {messages.length > 0 && (
          <div className="mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateIcebreaker}
              disabled={isGenerating}
              className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Generate Smart Icebreaker
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(inputValue)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
          <Button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
