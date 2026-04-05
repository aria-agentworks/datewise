'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Shirt,
  DollarSign,
  ThumbsUp,
  AlertTriangle,
  Gift,
  MessageCircle,
  Target,
  Lightbulb,
  Navigation,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Sparkles,
} from 'lucide-react'

export default function DateDetailView() {
  const setView = useAppStore((s) => s.setView)
  const selectedDateId = useAppStore((s) => s.selectedDateId)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    alignment: true,
    friction: false,
    compliments: false,
    topics: false,
    plan: true,
    icebreakers: true,
    deep: false,
    humor: false,
    steering: false,
    debrief: true,
  })

  useEffect(() => {
    if (!selectedDateId) return
    let cancelled = false
    fetch(`/api/dates/${selectedDateId}`)
      .then(r => r.json())
      .then(d => {
        if (!cancelled) {
          setData(d)
          setLoading(false)
        }
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [selectedDateId])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const startDebrief = () => {
    setView('debrief')
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-500'
    if (score >= 40) return 'text-amber-500'
    return 'text-red-500'
  }

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'from-emerald-100 to-green-100 border-emerald-200'
    if (score >= 40) return 'from-amber-100 to-yellow-100 border-amber-200'
    return 'from-red-100 to-rose-100 border-red-200'
  }

  if (loading) {
    return (
      <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  if (!data?.date) {
    return (
      <div className="view-enter min-h-screen flex items-center justify-center px-4">
        <Card className="border-0 shadow-xl max-w-md w-full text-center py-12">
          <CardContent className="px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Date not found</h2>
            <Button onClick={() => setView('dashboard')} className="mt-4 rounded-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { date, compatibility, plan, debrief } = data

  return (
    <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setView('dashboard')} className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="text-right">
            <h1 className="text-xl font-bold text-gray-900">{date.dateWithName}</h1>
            <p className="text-sm text-gray-500">
              {date.occasionType?.replace(/([A-Z])/g, ' $1').trim()} • {date.location || 'No location'}
            </p>
          </div>
        </div>

        {/* Compatibility Score */}
        {compatibility && (
          <Card className={`border-0 shadow-lg bg-gradient-to-br ${getScoreBg(compatibility.score)} py-6 mb-4`}>
            <CardContent className="px-6 text-center">
              <div className={`text-5xl font-bold ${getScoreColor(compatibility.score)} mb-1`}>
                {compatibility.score}
              </div>
              <p className="text-gray-600 font-medium text-sm">Compatibility Score</p>
            </CardContent>
          </Card>
        )}

        {/* Compatibility Details */}
        {compatibility && (
          <div className="space-y-3 mb-4">
            {compatibility.alignmentAreas?.length > 0 && (
              <Card className="border-0 shadow-md py-3">
                <CardContent className="px-5">
                  <button onClick={() => toggleSection('alignment')} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-sm text-gray-900">Alignment Areas</span>
                    </div>
                    {expandedSections.alignment ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expandedSections.alignment && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {compatibility.alignmentAreas.map((a: string, i: number) => (
                        <Badge key={i} className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">{a}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {compatibility.frictionPoints?.length > 0 && (
              <Card className="border-0 shadow-md py-3">
                <CardContent className="px-5">
                  <button onClick={() => toggleSection('friction')} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-sm text-gray-900">Friction Points</span>
                    </div>
                    {expandedSections.friction ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expandedSections.friction && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {compatibility.frictionPoints.map((p: string, i: number) => (
                        <Badge key={i} className="bg-amber-50 text-amber-700 border-amber-200 text-xs">{p}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {compatibility.topicsToAvoid?.length > 0 && (
              <Card className="border-0 shadow-md py-3">
                <CardContent className="px-5">
                  <button onClick={() => toggleSection('topics')} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-sm text-gray-900">Topics to Avoid</span>
                    </div>
                    {expandedSections.topics ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expandedSections.topics && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {compatibility.topicsToAvoid.map((t: string, i: number) => (
                        <Badge key={i} className="bg-red-50 text-red-700 border-red-200 text-xs">{t}</Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {compatibility.compliments?.length > 0 && (
              <Card className="border-0 shadow-md py-3">
                <CardContent className="px-5">
                  <button onClick={() => toggleSection('compliments')} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-pink-600" />
                      <span className="font-semibold text-sm text-gray-900">Compliment Ideas</span>
                    </div>
                    {expandedSections.compliments ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expandedSections.compliments && (
                    <div className="space-y-1.5 mt-3">
                      {compatibility.compliments.map((c: string, i: number) => (
                        <div key={i} className="bg-pink-50 rounded-lg p-2.5 text-xs text-pink-800 border border-pink-100">"{c}"</div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Date Plan */}
        {plan && (
          <Card className="border-0 shadow-lg py-5 mb-4">
            <CardHeader className="px-5 pb-0">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                Date Plan: {plan.venueName}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pt-3 space-y-3">
              <p className="text-sm text-gray-600">{plan.venueDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-rose-50 rounded-lg p-3 border border-rose-100">
                  <Clock className="w-4 h-4 text-rose-500 mb-1" />
                  <p className="text-xs font-semibold text-gray-900">Timing</p>
                  <p className="text-xs text-gray-600">{plan.timingSuggestion}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                  <Shirt className="w-4 h-4 text-orange-500 mb-1" />
                  <p className="text-xs font-semibold text-gray-900">Outfit</p>
                  <p className="text-xs text-gray-600">{plan.outfitDescription}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <DollarSign className="w-4 h-4 text-emerald-500 mb-1" />
                  <p className="text-xs font-semibold text-gray-900">Budget</p>
                  <p className="text-xs text-gray-600">{plan.budgetEstimate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Talking Points Summary */}
        {compatibility?.talkingPoints?.length > 0 && (
          <Card className="border-0 shadow-lg py-4 mb-4">
            <CardContent className="px-5">
              <button onClick={() => toggleSection('icebreakers')} className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-rose-600" />
                  <span className="font-semibold text-sm text-gray-900">Talking Points</span>
                </div>
                {expandedSections.icebreakers ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.icebreakers && (
                <div className="space-y-1.5 mt-3">
                  {compatibility.talkingPoints.map((t: string, i: number) => (
                    <div key={i} className="bg-rose-50 rounded-lg p-2.5 text-xs text-gray-700 border border-rose-100">{t}</div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Debrief Section */}
        {debrief && (
          <Card className="border-0 shadow-lg py-5 mb-4">
            <CardHeader className="px-5">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-500" />
                Post-Date Debrief
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 space-y-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-lg ${i < debrief.rating ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              {debrief.aiAnalysis && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <p className="text-sm text-gray-700 leading-relaxed">{debrief.aiAnalysis}</p>
                </div>
              )}
              {debrief.followUpMessage && (
                <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <p className="text-xs font-semibold text-emerald-800 mb-1">Suggested Follow-up Message:</p>
                  <p className="text-sm text-gray-700 italic">&quot;{debrief.followUpMessage}&quot;</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!compatibility && !plan && (
          <Card className="border-0 shadow-lg py-12 mb-4">
            <CardContent className="px-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">No analysis yet</h3>
              <p className="text-sm text-gray-500 mb-4">Go to &quot;Plan New Date&quot; to generate compatibility insights for this date.</p>
            </CardContent>
          </Card>
        )}

        {/* Action Button */}
        {date.status === 'planned' && compatibility && (
          <Button
            onClick={startDebrief}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12"
          >
            <FileText className="w-5 h-5 mr-2" />
            Start Post-Date Debrief
          </Button>
        )}
      </div>
    </div>
  )
}
