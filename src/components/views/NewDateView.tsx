'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  Heart,
  AlertTriangle,
  MessageCircle,
  Gift,
  Navigation,
  Clock,
  Shirt,
  DollarSign,
  ThumbsUp,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Target,
  PartyPopper,
  MapPin,
} from 'lucide-react'

interface DateForm {
  dateWithName: string
  datePlatform: string
  dateBioText: string
  occasionType: string
  location: string
  dateNumber: string
}

interface Compatibility {
  score: number
  alignmentAreas: string[]
  frictionPoints: string[]
  talkingPoints: string[]
  topicsToAvoid: string[]
  compliments: string[]
  conversationSteer: string[]
}

interface DatePlan {
  venueName: string
  venueDescription: string
  timingSuggestion: string
  outfitDescription: string
  budgetEstimate: string
  activitySuggestions: string[]
}

interface TalkingPoints {
  icebreakers: string[]
  deepStarters: string[]
  humorSuggestions: string[]
  steeringCues: string[]
}

export default function NewDateView() {
  const setView = useAppStore((s) => s.setView)
  const [form, setForm] = useState<DateForm>({
    dateWithName: '',
    datePlatform: '',
    dateBioText: '',
    occasionType: 'firstDate',
    location: '',
    dateNumber: '1',
  })
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<'form' | 'compatibility' | 'plan' | 'talking'>('form')
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null)
  const [datePlan, setDatePlan] = useState<DatePlan | null>(null)
  const [talkingPoints, setTalkingPoints] = useState<TalkingPoints | null>(null)
  const [savedDateId, setSavedDateId] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    alignment: true,
    friction: true,
    compliments: false,
    topics: false,
    icebreakers: true,
    deep: false,
    humor: false,
    steering: false,
  })

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(data => setProfile(data))
      .catch(() => {})
  }, [])

  const update = (field: keyof DateForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const runCompatibility = async () => {
    if (!profile) return
    setLoading(true)
    try {
      // Create date first
      const dateRes = await fetch('/api/dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId: profile.id || 'local-user' }),
      })
      const date = await dateRes.json()
      setSavedDateId(date.id)

      // Run compatibility
      const compRes = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateId: date.id, userProfile: profile, dateInfo: form }),
      })
      const compData = await compRes.json()
      setCompatibility(compData)
      setCurrentStep('compatibility')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const runDatePlan = async () => {
    if (!profile || !savedDateId) return
    setLoading(true)
    try {
      const res = await fetch('/api/date-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateId: savedDateId, userProfile: profile, dateInfo: form, compatibility }),
      })
      const data = await res.json()
      setDatePlan(data)
      setCurrentStep('plan')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const runTalkingPoints = async () => {
    if (!profile || !savedDateId) return
    setLoading(true)
    try {
      const res = await fetch('/api/talking-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateId: savedDateId, userProfile: profile, dateInfo: form, compatibility }),
      })
      const data = await res.json()
      setTalkingPoints(data)
      setCurrentStep('talking')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const saveToDashboard = () => {
    setView('dashboard')
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

  return (
    <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setView('dashboard')} className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Plan New Date</h1>
          <div className="w-20" />
        </div>

        {/* Date Form */}
        {currentStep === 'form' && (
          <div className="space-y-4">
            <Card className="border-0 shadow-lg py-6">
              <CardHeader className="px-6">
                <CardTitle className="text-lg">Date Details</CardTitle>
                <CardDescription>Tell us about your upcoming date</CardDescription>
              </CardHeader>
              <CardContent className="px-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateName">Date&apos;s Name *</Label>
                  <Input id="dateName" placeholder="Who are you meeting?" value={form.dateWithName} onChange={e => update('dateWithName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Where did you meet?</Label>
                  <Input id="platform" placeholder="Tinder, Hinge, through friends..." value={form.datePlatform} onChange={e => update('datePlatform', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Date&apos;s Bio / Profile Info</Label>
                  <Textarea id="bio" placeholder="Paste their bio or describe what you know about them..." value={form.dateBioText} onChange={e => update('dateBioText', e.target.value)} className="min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Occasion</Label>
                    <Select value={form.occasionType} onValueChange={v => update('occasionType', v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="firstDate">First Date</SelectItem>
                        <SelectItem value="secondDate">Second Date</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="specialOccasion">Special Occasion</SelectItem>
                        <SelectItem value="casualMeetup">Casual Meetup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Number</Label>
                    <Select value={form.dateNumber} onValueChange={v => update('dateNumber', v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Date</SelectItem>
                        <SelectItem value="2">2nd Date</SelectItem>
                        <SelectItem value="3">3rd Date</SelectItem>
                        <SelectItem value="4">4th Date</SelectItem>
                        <SelectItem value="5">5th+ Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location / City</Label>
                  <Input id="location" placeholder="New York, Downtown, etc." value={form.location} onChange={e => update('location', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {!profile && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-700">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Please complete your profile first for better analysis.
                </p>
                <Button variant="link" className="text-amber-700 p-0 h-auto mt-1" onClick={() => setView('profile')}>
                  Go to Profile Builder →
                </Button>
              </div>
            )}

            <Button
              onClick={runCompatibility}
              disabled={loading || !form.dateWithName.trim()}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Compatibility...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Compatibility
                </>
              )}
            </Button>
          </div>
        )}

        {/* Compatibility Results */}
        {currentStep === 'compatibility' && compatibility && (
          <div className="space-y-4">
            {/* Score Card */}
            <Card className={`border-0 shadow-lg bg-gradient-to-br ${getScoreBg(compatibility.score)} py-6`}>
              <CardContent className="px-6 text-center">
                <div className={`text-6xl font-bold ${getScoreColor(compatibility.score)} score-glow mb-2`}>
                  {compatibility.score}
                </div>
                <p className="text-gray-600 font-medium">Compatibility Score</p>
                <p className="text-sm text-gray-500 mt-1">
                  {compatibility.score >= 70 ? "Great match! You have strong potential." :
                   compatibility.score >= 40 ? "Decent connection with room to grow." :
                   "Challenging match — but opposites can attract!"}
                </p>
              </CardContent>
            </Card>

            {/* Alignment Areas */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('alignment')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <ThumbsUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Areas of Alignment</span>
                  </div>
                  {expandedSections.alignment ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.alignment && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {compatibility.alignmentAreas?.map((area, i) => (
                      <Badge key={i} className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">{area}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Friction Points */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('friction')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Potential Friction Points</span>
                  </div>
                  {expandedSections.friction ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.friction && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {compatibility.frictionPoints?.map((point, i) => (
                      <Badge key={i} className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1">{point}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Compliments */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('compliments')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Gift className="w-4 h-4 text-pink-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Compliment Suggestions</span>
                  </div>
                  {expandedSections.compliments ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.compliments && (
                  <div className="space-y-2 mt-4">
                    {compatibility.compliments?.map((c, i) => (
                      <div key={i} className="bg-pink-50 rounded-lg p-3 text-sm text-pink-800 border border-pink-100">"{c}"</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Topics to Avoid */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('topics')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Topics to Avoid</span>
                  </div>
                  {expandedSections.topics ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.topics && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {compatibility.topicsToAvoid?.map((topic, i) => (
                      <Badge key={i} className="bg-red-50 text-red-700 border-red-200 px-3 py-1">{topic}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button
              onClick={runDatePlan}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Generate Date Plan
                </>
              )}
            </Button>
          </div>
        )}

        {/* Date Plan */}
        {currentStep === 'plan' && datePlan && (
          <div className="space-y-4">
            <Card className="border-0 shadow-lg py-6">
              <CardHeader className="px-6">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  {datePlan.venueName}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">{datePlan.venueDescription}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                    <Clock className="w-5 h-5 text-rose-500 mb-2" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Timing</h4>
                    <p className="text-sm text-gray-600">{datePlan.timingSuggestion}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <Shirt className="w-5 h-5 text-orange-500 mb-2" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Outfit</h4>
                    <p className="text-sm text-gray-600">{datePlan.outfitDescription}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <DollarSign className="w-5 h-5 text-emerald-500 mb-2" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Budget</h4>
                    <p className="text-sm text-gray-600">{datePlan.budgetEstimate}</p>
                  </div>
                </div>

                {datePlan.activitySuggestions && datePlan.activitySuggestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <PartyPopper className="w-4 h-4 text-rose-500" />
                      Activity Ideas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {datePlan.activitySuggestions.map((act, i) => (
                        <Badge key={i} className="bg-rose-50 text-rose-700 border-rose-200 px-3 py-1">{act}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button
              onClick={runTalkingPoints}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Talking Points...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Talking Points
                </>
              )}
            </Button>
          </div>
        )}

        {/* Talking Points */}
        {currentStep === 'talking' && talkingPoints && (
          <div className="space-y-4">
            {/* Icebreakers */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('icebreakers')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Icebreakers</span>
                  </div>
                  {expandedSections.icebreakers ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.icebreakers && (
                  <div className="space-y-2 mt-4">
                    {talkingPoints.icebreakers?.map((ice, i) => (
                      <div key={i} className="bg-rose-50 rounded-lg p-3 text-sm text-gray-700 border border-rose-100">{ice}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Deep Starters */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('deep')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Deep Conversation Starters</span>
                  </div>
                  {expandedSections.deep ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.deep && (
                  <div className="space-y-2 mt-4">
                    {talkingPoints.deepStarters?.map((s, i) => (
                      <div key={i} className="bg-purple-50 rounded-lg p-3 text-sm text-gray-700 border border-purple-100">{s}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Humor Suggestions */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('humor')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Humor Suggestions</span>
                  </div>
                  {expandedSections.humor ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.humor && (
                  <div className="space-y-2 mt-4">
                    {talkingPoints.humorSuggestions?.map((h, i) => (
                      <div key={i} className="bg-amber-50 rounded-lg p-3 text-sm text-gray-700 border border-amber-100">{h}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Steering Cues */}
            <Card className="border-0 shadow-lg py-4">
              <CardContent className="px-6">
                <button onClick={() => toggleSection('steering')} className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="font-semibold text-gray-900">Conversation Steering Cues</span>
                  </div>
                  {expandedSections.steering ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedSections.steering && (
                  <div className="space-y-2 mt-4">
                    {talkingPoints.steeringCues?.map((c, i) => (
                      <div key={i} className="bg-teal-50 rounded-lg p-3 text-sm text-gray-700 border border-teal-100">{c}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100">
              <p className="text-sm text-rose-700 text-center">
                <Sparkles className="w-4 h-4 inline mr-1" />
                You&apos;re all set! Save this date and review your plan before heading out.
              </p>
            </div>

            <Button
              onClick={saveToDashboard}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base"
            >
              Save & Go to Dashboard
            </Button>
          </div>
        )}

        {/* Loading State for Compatibility */}
        {loading && currentStep === 'form' && (
          <div className="space-y-4">
            <Card className="border-0 shadow-lg py-6">
              <CardContent className="px-6 space-y-4">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-rose-500 animate-pulse" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Analyzing Compatibility...</h3>
                  <p className="text-sm text-gray-500">Our AI is comparing your profiles</p>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
