'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, User, Brain, Target, CalendarHeart, Loader2, Check, X } from 'lucide-react'

const INTEREST_OPTIONS = [
  'Travel', 'Cooking', 'Fitness', 'Music', 'Movies', 'Reading', 'Photography',
  'Hiking', 'Gaming', 'Art', 'Dancing', 'Yoga', 'Coffee', 'Wine', 'Sports',
  'Tech', 'Fashion', 'Nature', 'Foodie', 'Theater', 'Volunteering', 'Pets',
]

interface ProfileForm {
  name: string
  gender: string
  age: string
  height: string
  bodyType: string
  communicationStyle: string
  humorStyle: string
  loveLanguage: string
  interests: string[]
  datingGoals: string
  dealBreakers: string
  budgetRange: string
  preferredDateSetting: string[]
}

const defaultForm: ProfileForm = {
  name: '',
  gender: 'preferNotToSay',
  age: '',
  height: '',
  bodyType: 'average',
  communicationStyle: 'thoughtful',
  humorStyle: 'warm',
  loveLanguage: 'qualityTime',
  interests: [],
  datingGoals: 'notSure',
  dealBreakers: '',
  budgetRange: 'moderate',
  preferredDateSetting: [],
}

export default function ProfileBuilderView() {
  const setView = useAppStore((s) => s.setView)
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<ProfileForm>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [existingProfile, setExistingProfile] = useState<any>(null)

  const STEP_ICONS = [User, Brain, Target, CalendarHeart]
  const STEP_TITLES = [t.profile.step0Title, t.profile.step1Title, t.profile.step2Title, t.profile.step3Title]
  const STEP_DESCS = [t.profile.step0Desc, t.profile.step1Desc, t.profile.step2Desc, t.profile.step3Desc]

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data = await res.json()
          if (data) {
            setExistingProfile(data)
            setForm({
              name: data.name || '',
              gender: data.gender || 'preferNotToSay',
              age: data.age?.toString() || '',
              height: data.height || '',
              bodyType: data.bodyType || 'average',
              communicationStyle: data.communicationStyle || 'thoughtful',
              humorStyle: data.humorStyle || 'warm',
              loveLanguage: data.loveLanguage || 'qualityTime',
              interests: data.interests ? data.interests.split(',').filter(Boolean) : [],
              datingGoals: data.datingGoals || 'notSure',
              dealBreakers: data.dealBreakers || '',
              budgetRange: data.budgetRange || 'moderate',
              preferredDateSetting: data.preferredDateSetting ? data.preferredDateSetting.split(',').filter(Boolean) : [],
            })
          }
        }
      } catch (e) {
        // ignore
      }
    }
    loadProfile()
  }, [])

  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const toggleSetting = (setting: string) => {
    setForm(prev => ({
      ...prev,
      preferredDateSetting: prev.preferredDateSetting.includes(setting)
        ? prev.preferredDateSetting.filter(s => s !== setting)
        : [...prev.preferredDateSetting, setting]
    }))
  }

  const update = (field: keyof ProfileForm, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (step === 0) return form.name.trim().length > 0
    return true
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const payload = {
        ...form,
        interests: form.interests.join(','),
        preferredDateSetting: form.preferredDateSetting.join(','),
      }
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSaved(true)
      setTimeout(() => setView('dashboard'), 1200)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (saved) {
    return (
      <div className="view-enter min-h-screen flex items-center justify-center px-4">
        <Card className="border-0 shadow-xl max-w-md w-full text-center py-12">
          <CardContent className="px-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.profile.savedTitle}</h2>
            <p className="text-gray-500">{t.profile.savedSubtitle}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setView('landing')} className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.common.back}
          </Button>
          <h1 className="text-xl font-bold text-gray-900">{t.profile.title}</h1>
          <div className="w-20" />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEP_TITLES.map((title, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <button
                  key={i}
                  onClick={() => i < step && setStep(i)}
                  className={`flex flex-col items-center gap-1.5 transition-opacity ${i <= step ? 'opacity-100' : 'opacity-40'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    i < step ? 'bg-emerald-100 text-emerald-600' :
                    i === step ? 'bg-rose-500 text-white' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {i < step ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-medium text-gray-500 hidden sm:block">{title}</span>
                </button>
              )
            })}
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-lg py-6 mb-6">
          <CardHeader className="px-6">
            <CardTitle className="text-xl">{STEP_TITLES[step]}</CardTitle>
            <CardDescription>{STEP_DESCS[step]}</CardDescription>
          </CardHeader>
          <CardContent className="px-6 space-y-5">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">{t.profile.nameLabel}</Label>
                  <Input id="name" placeholder={t.profile.namePlaceholder} value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t.profile.genderLabel}</Label>
                  <Select value={form.gender} onValueChange={v => update('gender', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t.profile.male}</SelectItem>
                      <SelectItem value="female">{t.profile.female}</SelectItem>
                      <SelectItem value="nonBinary">{t.profile.nonBinary}</SelectItem>
                      <SelectItem value="preferNotToSay">{t.profile.preferNotToSay}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">{t.profile.ageLabel}</Label>
                    <Input id="age" type="number" placeholder="25" value={form.age} onChange={e => update('age', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">{t.profile.heightLabel}</Label>
                    <Input id="height" placeholder="5'10&quot;" value={form.height} onChange={e => update('height', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>{t.profile.bodyTypeLabel}</Label>
                  <Select value={form.bodyType} onValueChange={v => update('bodyType', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slim">{t.profile.slim}</SelectItem>
                      <SelectItem value="average">{t.profile.average}</SelectItem>
                      <SelectItem value="athletic">{t.profile.athletic}</SelectItem>
                      <SelectItem value="plusSize">{t.profile.plusSize}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.profile.communicationStyleLabel}</Label>
                  <Select value={form.communicationStyle} onValueChange={v => update('communicationStyle', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">{t.profile.directConfident}</SelectItem>
                      <SelectItem value="playful">{t.profile.playfulFlirty}</SelectItem>
                      <SelectItem value="introverted">{t.profile.thoughtfulReserved}</SelectItem>
                      <SelectItem value="thoughtful">{t.profile.warmConsiderate}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.profile.humorStyleLabel}</Label>
                  <Select value={form.humorStyle} onValueChange={v => update('humorStyle', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarcastic">{t.profile.sarcasticWitty}</SelectItem>
                      <SelectItem value="witty">{t.profile.quickClever}</SelectItem>
                      <SelectItem value="warm">{t.profile.warmGoofy}</SelectItem>
                      <SelectItem value="dry">{t.profile.dryDeadpan}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.profile.loveLanguageLabel}</Label>
                  <Select value={form.loveLanguage} onValueChange={v => update('loveLanguage', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="words">{t.profile.wordsOfAffirmation}</SelectItem>
                      <SelectItem value="acts">{t.profile.actsOfService}</SelectItem>
                      <SelectItem value="qualityTime">{t.profile.qualityTime}</SelectItem>
                      <SelectItem value="gifts">{t.profile.gifts}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>{t.profile.interestsLabel}</Label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                          form.interests.includes(interest)
                            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t.profile.datingGoalsLabel}</Label>
                  <Select value={form.datingGoals} onValueChange={v => update('datingGoals', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">{t.profile.casual}</SelectItem>
                      <SelectItem value="relationship">{t.profile.seriousRelationship}</SelectItem>
                      <SelectItem value="marriage">{t.profile.marriage}</SelectItem>
                      <SelectItem value="notSure">{t.profile.notSure}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealBreakers">{t.profile.dealBreakersLabel}</Label>
                  <Textarea
                    id="dealBreakers"
                    placeholder={t.profile.dealBreakersPlaceholder}
                    value={form.dealBreakers}
                    onChange={e => update('dealBreakers', e.target.value)}
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-gray-400">{t.profile.dealBreakersHint}</p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>{t.profile.budgetLabel}</Label>
                  <Select value={form.budgetRange} onValueChange={v => update('budgetRange', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget-friendly ($0-$30)</SelectItem>
                      <SelectItem value="moderate">Moderate ($30-$80)</SelectItem>
                      <SelectItem value="premium">Premium ($80+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t.profile.settingsLabel}</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'quietRestaurant', label: '🍽️ Quiet Restaurant' },
                      { value: 'activity', label: '🎯 Fun Activity' },
                      { value: 'outdoors', label: '🌿 Outdoors' },
                      { value: 'coffee', label: '☕ Coffee Shop' },
                      { value: 'casual', label: '🍺 Casual Bar' },
                    ].map(setting => (
                      <button
                        key={setting.value}
                        onClick={() => toggleSetting(setting.value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                          form.preferredDateSetting.includes(setting.value)
                            ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                        }`}
                      >
                        {setting.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                  <p className="text-sm text-rose-700">
                    <strong>{t.profile.tipTitle}</strong> {t.profile.tipText}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => step > 0 ? setStep(step - 1) : setView('landing')}
            className="rounded-full px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 0 ? t.common.cancel : t.common.previous}
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full px-6"
            >
              {t.common.next}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                <>
                  {t.profile.saveProfile}
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
