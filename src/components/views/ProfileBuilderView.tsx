'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
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

const STEP_ICONS = [User, Brain, Target, CalendarHeart]
const STEP_TITLES = ['Basic Info', 'Personality', 'Interests & Goals', 'Date Preferences']

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
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<ProfileForm>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [existingProfile, setExistingProfile] = useState<any>(null)

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Saved!</h2>
            <p className="text-gray-500">Taking you to your dashboard...</p>
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
            Back
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Build Your Profile</h1>
          <div className="w-20" />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEP_TITLES.map((title, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <button
                  key={title}
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
            <CardDescription>
              {step === 0 && "Let's start with the basics"}
              {step === 1 && "Tell us about your personality and style"}
              {step === 2 && "What interests you and what are you looking for?"}
              {step === 3 && "How do you like to spend your dates?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 space-y-5">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" placeholder="Enter your name" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={form.gender} onValueChange={v => update('gender', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="nonBinary">Non-binary</SelectItem>
                      <SelectItem value="preferNotToSay">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="25" value={form.age} onChange={e => update('age', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" placeholder="5'10&quot;" value={form.height} onChange={e => update('height', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>Body Type</Label>
                  <Select value={form.bodyType} onValueChange={v => update('bodyType', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slim">Slim</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="athletic">Athletic</SelectItem>
                      <SelectItem value="plusSize">Plus Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Communication Style</Label>
                  <Select value={form.communicationStyle} onValueChange={v => update('communicationStyle', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct &amp; Confident</SelectItem>
                      <SelectItem value="playful">Playful &amp; Flirty</SelectItem>
                      <SelectItem value="introverted">Thoughtful &amp; Reserved</SelectItem>
                      <SelectItem value="thoughtful">Warm &amp; Considerate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Humor Style</Label>
                  <Select value={form.humorStyle} onValueChange={v => update('humorStyle', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarcastic">Sarcastic &amp; Witty</SelectItem>
                      <SelectItem value="witty">Quick &amp; Clever</SelectItem>
                      <SelectItem value="warm">Warm &amp; Goofy</SelectItem>
                      <SelectItem value="dry">Dry &amp; Deadpan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Love Language</Label>
                  <Select value={form.loveLanguage} onValueChange={v => update('loveLanguage', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="words">Words of Affirmation</SelectItem>
                      <SelectItem value="acts">Acts of Service</SelectItem>
                      <SelectItem value="qualityTime">Quality Time</SelectItem>
                      <SelectItem value="gifts">Gifts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Interests (select all that apply)</Label>
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
                  <Label>Dating Goals</Label>
                  <Select value={form.datingGoals} onValueChange={v => update('datingGoals', v)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Dating</SelectItem>
                      <SelectItem value="relationship">Serious Relationship</SelectItem>
                      <SelectItem value="marriage">Marriage</SelectItem>
                      <SelectItem value="notSure">Not Sure Yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealBreakers">Deal Breakers</Label>
                  <Textarea
                    id="dealBreakers"
                    placeholder="Smoking, long distance, doesn't want kids..."
                    value={form.dealBreakers}
                    onChange={e => update('dealBreakers', e.target.value)}
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-gray-400">Separate with commas</p>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>Budget Range</Label>
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
                  <Label>Preferred Date Settings (select all that apply)</Label>
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
                    <strong>Tip:</strong> You can always update your profile later. The more info you provide, the better our AI can personalize your experience!
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
            {step === 0 ? 'Cancel' : 'Previous'}
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full px-6"
            >
              Next
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
                  Saving...
                </>
              ) : (
                <>
                  Save Profile
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
