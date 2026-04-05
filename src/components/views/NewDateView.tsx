'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n'
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
  RefreshCw,
  Timer,
  AlertCircle,
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

interface DatePlanData {
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
  const { t, locale } = useTranslation()
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
  const [datePlan, setDatePlan] = useState<DatePlanData | null>(null)
  const [talkingPoints, setTalkingPoints] = useState<TalkingPoints | null>(null)
  const [savedDateId, setSavedDateId] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    alignment: true, friction: true, compliments: false, topics: false,
    icebreakers: true, deep: false, humor: false, steering: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [timeoutReached, setTimeoutReached] = useState(false)
  const [checkingSubscription, setCheckingSubscription] = useState(false)

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(data => setProfile(data)).catch(() => {})
  }, [])

  const update = (field: keyof DateForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const checkSubscriptionAndRun = async () => {
    setCheckingSubscription(true)
    try {
      const subRes = await fetch('/api/subscription')
      const subData = await subRes.json()
      if (!subData.canCreateDate) {
        setError('limit_reached')
        setCheckingSubscription(false)
        return false
      }
    } catch { }
    setCheckingSubscription(false)
    return true
  }

  const startTimeout = () => {
    setTimeoutReached(false)
    const timer = setTimeout(() => { setTimeoutReached(true) }, 30000)
    return () => clearTimeout(timer)
  }

  const runCompatibility = async () => {
    if (!profile) return
    const canProceed = await checkSubscriptionAndRun()
    if (!canProceed) return
    setLoading(true); setError(null)
    const clearTimer = startTimeout()
    try {
      const dateRes = await fetch('/api/dates', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: locale }),
      })
      const dateData = await dateRes.json()
      if (dateRes.status === 403) { setError('limit_reached'); setLoading(false); return }
      if (!dateRes.ok) { setError(dateData.error || 'Failed'); setLoading(false); return }
      setSavedDateId(dateData.id)

      const compRes = await fetch('/api/compatibility', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateId: dateData.id, userProfile: profile, dateInfo: form, lang: locale }),
      })
      const compData = await compRes.json()
      if (!compRes.ok) { setError(compData.error || 'Failed'); setLoading(false); return }
      setCompatibility(compData)
      setCurrentStep('compatibility')
    } catch { setError(t.common.error) } finally { clearTimer(); setLoading(false) }
  }

  const runDatePlan = async () => {
    if (!profile || !savedDateId) return
    setLoading(true); setError(null)
    const clearTimer = startTimeout()
    try {
      const res = await fetch('/api/date-plan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateId: savedDateId, userProfile: profile, dateInfo: form, compatibility, lang: locale }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed'); setLoading(false); return }
      setDatePlan(data); setCurrentStep('plan')
    } catch { setError(t.common.error) } finally { clearTimer(); setLoading(false) }
  }

  const runTalkingPoints = async () => {
    if (!profile || !savedDateId) return
    setLoading(true); setError(null)
    const clearTimer = startTimeout()
    try {
      const res = await fetch('/api/talking-points', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateId: savedDateId, userProfile: profile, dateInfo: form, compatibility, lang: locale }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed'); setLoading(false); return }
      setTalkingPoints(data); setCurrentStep('talking')
    } catch { setError(t.common.error) } finally { clearTimer(); setLoading(false) }
  }

  const handleRetry = () => {
    setError(null); setTimeoutReached(false)
    if (currentStep === 'form') runCompatibility()
    else if (currentStep === 'compatibility') runDatePlan()
    else if (currentStep === 'plan') runTalkingPoints()
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
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setView('dashboard')} className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t.common.back}
          </Button>
          <h1 className="text-xl font-bold text-gray-900">{t.newDate.title}</h1>
          <div className="w-20" />
        </div>

        {error === 'limit_reached' && (
          <Card className="border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 py-6 mb-4">
            <CardContent className="px-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.newDate.freeLimitReached}</h3>
              <p className="text-sm text-gray-600 mb-4">{t.newDate.freeLimitReachedDesc}</p>
              <div className="flex gap-3">
                <Button onClick={() => setView('pricing')} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full">
                  <Sparkles className="w-4 h-4 mr-2" /> {t.newDate.upgradeToPro}
                </Button>
                <Button variant="outline" onClick={() => setView('dashboard')} className="rounded-full">{t.newDate.goBack}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {error && error !== 'limit_reached' && (
          <Card className="border-2 border-amber-300 bg-amber-50 py-6 mb-4">
            <CardContent className="px-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{t.newDate.somethingWentWrong}</h3>
              <p className="text-sm text-gray-600 mb-4">{error}</p>
              <Button onClick={handleRetry} variant="outline" className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" /> {t.common.retry}
              </Button>
            </CardContent>
          </Card>
        )}

        {timeoutReached && loading && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
            <p className="text-sm text-amber-700 text-center flex items-center justify-center gap-2">
              <Timer className="w-4 h-4" />
              {t.newDate.takingTooLong}{' '}
              <button onClick={() => { setLoading(false); setError(null); setTimeoutReached(false); }} className="underline font-medium">
                {t.common.tryAgain}
              </button>
            </p>
          </div>
        )}

        {currentStep === 'form' && (
          <div className="space-y-4">
            <Card className="border-0 shadow-lg py-6">
              <CardHeader className="px-6">
                <CardTitle className="text-lg">{t.newDate.dateDetails}</CardTitle>
                <CardDescription>{t.newDate.dateDetailsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="px-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateName">{t.newDate.dateNameLabel}</Label>
                  <Input id="dateName" placeholder={t.newDate.dateNamePlaceholder} value={form.dateWithName} onChange={e => update('dateWithName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">{t.newDate.platformLabel}</Label>
                  <Input id="platform" placeholder={t.newDate.platformPlaceholder} value={form.datePlatform} onChange={e => update('datePlatform', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t.newDate.bioLabel}</Label>
                  <Textarea id="bio" placeholder={t.newDate.bioPlaceholder} value={form.dateBioText} onChange={e => update('dateBioText', e.target.value)} className="min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.newDate.occasionLabel}</Label>
                    <Select value={form.occasionType} onValueChange={v => update('occasionType', v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="firstDate">{t.newDate.firstDate}</SelectItem>
                        <SelectItem value="secondDate">{t.newDate.secondDate}</SelectItem>
                        <SelectItem value="anniversary">{t.newDate.anniversary}</SelectItem>
                        <SelectItem value="birthday">{t.newDate.birthday}</SelectItem>
                        <SelectItem value="specialOccasion">{t.newDate.specialOccasion}</SelectItem>
                        <SelectItem value="casualMeetup">{t.newDate.casualMeetup}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.newDate.dateNumberLabel}</Label>
                    <Select value={form.dateNumber} onValueChange={v => update('dateNumber', v)}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st</SelectItem><SelectItem value="2">2nd</SelectItem>
                        <SelectItem value="3">3rd</SelectItem><SelectItem value="4">4th</SelectItem>
                        <SelectItem value="5">5th+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t.newDate.locationLabel}</Label>
                  <Input id="location" placeholder={t.newDate.locationPlaceholder} value={form.location} onChange={e => update('location', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {!profile && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-700">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />{t.newDate.profileWarning}
                </p>
                <Button variant="link" className="text-amber-700 p-0 h-auto mt-1" onClick={() => setView('profile')}>
                  {t.newDate.profileWarningBtn}
                </Button>
              </div>
            )}

            <Button onClick={runCompatibility} disabled={loading || checkingSubscription || !form.dateWithName.trim()} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base">
              {loading || checkingSubscription ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{checkingSubscription ? t.newDate.checkingPlan : t.newDate.analyzingCompatibility}</>
              ) : (
                <><Sparkles className="w-5 h-5 mr-2" />{t.newDate.analyzeCompatibility}</>
              )}
            </Button>
          </div>
        )}

        {currentStep === 'compatibility' && compatibility && (
          <div className="space-y-4">
            <Card className={`border-0 shadow-lg bg-gradient-to-br ${getScoreBg(compatibility.score)} py-6`}>
              <CardContent className="px-6 text-center">
                <div className={`text-6xl font-bold ${getScoreColor(compatibility.score)} score-glow mb-2`}>{compatibility.score}</div>
                <p className="text-gray-600 font-medium">{t.newDate.compatibilityScore}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {compatibility.score >= 70 ? t.newDate.greatMatch : compatibility.score >= 40 ? t.newDate.decentConnection : t.newDate.challengingMatch}
                </p>
              </CardContent>
            </Card>
            {[
              { key: 'alignment', icon: ThumbsUp, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', label: t.newDate.alignmentAreas, items: compatibility.alignmentAreas, badgeCls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { key: 'friction', icon: AlertTriangle, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', label: t.newDate.frictionPoints, items: compatibility.frictionPoints, badgeCls: 'bg-amber-50 text-amber-700 border-amber-200' },
              { key: 'compliments', icon: Gift, iconBg: 'bg-pink-100', iconColor: 'text-pink-600', label: t.newDate.complimentSuggestions, items: compatibility.compliments, badgeCls: 'bg-pink-50 text-pink-800 border-pink-100', isText: true },
              { key: 'topics', icon: AlertTriangle, iconBg: 'bg-red-100', iconColor: 'text-red-600', label: t.newDate.topicsToAvoid, items: compatibility.topicsToAvoid, badgeCls: 'bg-red-50 text-red-700 border-red-200' },
            ].map((section) => (
              <Card key={section.key} className="border-0 shadow-lg py-4">
                <CardContent className="px-6">
                  <button onClick={() => toggleSection(section.key)} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${section.iconBg} rounded-lg flex items-center justify-center`}>
                        <section.icon className={`w-4 h-4 ${section.iconColor}`} />
                      </div>
                      <span className="font-semibold text-gray-900">{section.label}</span>
                    </div>
                    {expandedSections[section.key] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expandedSections[section.key] && section.items && (
                    section.isText ? (
                      <div className="space-y-2 mt-4">
                        {section.items.map((c: string, i: number) => (
                          <div key={i} className="bg-pink-50 rounded-lg p-3 text-sm text-pink-800 border border-pink-100">&ldquo;{c}&rdquo;</div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {section.items.map((item: string, i: number) => (
                          <Badge key={i} className={`${section.badgeCls} px-3 py-1`}>{item}</Badge>
                        ))}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            ))}
            <Button onClick={runDatePlan} disabled={loading} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base">
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t.newDate.generatingPlan}</> : <><Heart className="w-5 h-5 mr-2" />{t.newDate.generateDatePlan}</>}
            </Button>
          </div>
        )}

        {currentStep === 'plan' && datePlan && (
          <div className="space-y-4">
            <Card className="border-0 shadow-lg py-6">
              <CardHeader className="px-6"><CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-rose-500" />{datePlan.venueName}</CardTitle></CardHeader>
              <CardContent className="px-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">{datePlan.venueDescription}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-rose-50 rounded-xl p-4 border border-rose-100"><Clock className="w-5 h-5 text-rose-500 mb-2" /><h4 className="font-semibold text-gray-900 text-sm mb-1">{t.newDate.timing}</h4><p className="text-sm text-gray-600">{datePlan.timingSuggestion}</p></div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100"><Shirt className="w-5 h-5 text-orange-500 mb-2" /><h4 className="font-semibold text-gray-900 text-sm mb-1">{t.newDate.outfit}</h4><p className="text-sm text-gray-600">{datePlan.outfitDescription}</p></div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100"><DollarSign className="w-5 h-5 text-emerald-500 mb-2" /><h4 className="font-semibold text-gray-900 text-sm mb-1">{t.newDate.budget}</h4><p className="text-sm text-gray-600">{datePlan.budgetEstimate}</p></div>
                </div>
                {datePlan.activitySuggestions && datePlan.activitySuggestions.length > 0 && (
                  <div><h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><PartyPopper className="w-4 h-4 text-rose-500" />{t.newDate.activityIdeas}</h4>
                    <div className="flex flex-wrap gap-2">{datePlan.activitySuggestions.map((act, i) => <Badge key={i} className="bg-rose-50 text-rose-700 border-rose-200 px-3 py-1">{act}</Badge>)}</div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Button onClick={runTalkingPoints} disabled={loading} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base">
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t.newDate.generatingTalkingPoints}</> : <><MessageCircle className="w-5 h-5 mr-2" />{t.newDate.getTalkingPoints}</>}
            </Button>
          </div>
        )}

        {currentStep === 'talking' && talkingPoints && (
          <div className="space-y-4">
            {[
              { key: 'icebreakers', icon: MessageCircle, iconBg: 'bg-rose-100', iconColor: 'text-rose-600', label: t.newDate.icebreakers, items: talkingPoints.icebreakers, itemCls: 'bg-rose-50 text-gray-700 border-rose-100' },
              { key: 'deep', icon: Target, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', label: t.newDate.deepConversationStarters, items: talkingPoints.deepStarters, itemCls: 'bg-purple-50 text-gray-700 border-purple-100' },
              { key: 'humor', icon: Lightbulb, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', label: t.newDate.humorSuggestions, items: talkingPoints.humorSuggestions, itemCls: 'bg-amber-50 text-gray-700 border-amber-100' },
              { key: 'steering', icon: Navigation, iconBg: 'bg-teal-100', iconColor: 'text-teal-600', label: t.newDate.steeringCues, items: talkingPoints.steeringCues, itemCls: 'bg-teal-50 text-gray-700 border-teal-100' },
            ].map((section) => (
              <Card key={section.key} className="border-0 shadow-lg py-4">
                <CardContent className="px-6">
                  <button onClick={() => toggleSection(section.key)} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${section.iconBg} rounded-lg flex items-center justify-center`}><section.icon className={`w-4 h-4 ${section.iconColor}`} /></div>
                      <span className="font-semibold text-gray-900">{section.label}</span>
                    </div>
                    {expandedSections[section.key] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {expandedSections[section.key] && section.items && (
                    <div className="space-y-2 mt-4">
                      {section.items.map((item: string, i: number) => (
                        <div key={i} className={`${section.itemCls} rounded-lg p-3 text-sm`}>{item}</div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100">
              <p className="text-sm text-rose-700 text-center"><Sparkles className="w-4 h-4 inline mr-1" />{t.newDate.allSetMsg}</p>
            </div>
            <Button onClick={() => setView('dashboard')} className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base">{t.newDate.saveAndGoToDashboard}</Button>
          </div>
        )}

        {loading && currentStep === 'form' && (
          <div className="space-y-4">
            <Card className="border-0 shadow-lg py-6"><CardContent className="px-6 space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"><Sparkles className="w-8 h-8 text-rose-500 animate-pulse" /></div>
                <h3 className="font-semibold text-gray-900 mb-1">{t.newDate.analyzingCompatibility}</h3>
                <p className="text-sm text-gray-500">{t.newDate.aiComparing}</p>
              </div>
              <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-5/6" />
            </CardContent></Card>
          </div>
        )}
      </div>
    </div>
  )
}
