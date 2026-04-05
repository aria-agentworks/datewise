'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowLeft,
  Star,
  Loader2,
  Sparkles,
  Check,
  MessageCircle,
  Lightbulb,
  Copy,
  RefreshCw,
  AlertTriangle,
  Timer,
} from 'lucide-react'

export default function DebriefView() {
  const setView = useAppStore((s) => s.setView)
  const selectedDateId = useAppStore((s) => s.selectedDateId)
  const [dateData, setDateData] = useState<any>(null)
  const [rating, setRating] = useState(3)
  const [whatWentWell, setWhatWentWell] = useState('')
  const [whatWasAwkward, setWhatWasAwkward] = useState('')
  const [surprises, setSurprises] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeoutReached, setTimeoutReached] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!selectedDateId) return
    setLoadingData(true)
    fetch(`/api/dates/${selectedDateId}`)
      .then(r => r.json())
      .then(d => setDateData(d))
      .catch(() => setError('Failed to load date data'))
      .finally(() => setLoadingData(false))
  }, [selectedDateId])

  const startTimeout = useCallback(() => {
    setTimeoutReached(false)
    timerRef.current = setTimeout(() => {
      setTimeoutReached(true)
    }, 30000)
  }, [])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleSubmit = async () => {
    if (!selectedDateId || !dateData) return
    setLoading(true)
    setError(null)
    startTimeout()
    try {
      const res = await fetch('/api/debrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateId: selectedDateId,
          dateData: dateData.date,
          rating,
          whatWentWell,
          whatWasAwkward,
          surprises,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to analyze debrief')
        setLoading(false)
        clearTimer()
        return
      }
      setResult(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      clearTimer()
      setLoading(false)
    }
  }

  const copyMessage = () => {
    if (result?.followUpMessage) {
      navigator.clipboard.writeText(result.followUpMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loadingData) {
    return (
      <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => setView('dateDetail')} className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Post-Date Debrief</h1>
          <div className="w-20" />
        </div>

        {/* Timeout Warning */}
        {timeoutReached && loading && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
            <p className="text-sm text-amber-700 text-center flex items-center justify-center gap-2">
              <Timer className="w-4 h-4" />
              Taking too long?{' '}
              <button onClick={() => { setLoading(false); setError(null); setTimeoutReached(false); clearTimer(); }} className="underline font-medium">
                Try again
              </button>
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <Card className="border-2 border-amber-300 bg-amber-50 py-6 mb-4">
            <CardContent className="px-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Oops! Something went wrong</h3>
              <p className="text-sm text-gray-600 mb-4">{error}</p>
              <Button onClick={handleSubmit} variant="outline" className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!result ? (
          <>
            {/* Date Info */}
            {dateData?.date && (
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100 mb-6">
                <p className="text-sm text-rose-700">
                  <strong>Date with {dateData.date.dateWithName}</strong> — {dateData.date.occasionType?.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            )}

            {/* Rating */}
            <Card className="border-0 shadow-lg py-5 mb-4">
              <CardContent className="px-6">
                <Label className="text-base font-semibold">How did the date go?</Label>
                <p className="text-sm text-gray-500 mb-4">Rate your overall experience</p>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {rating === 1 && 'Terrible'}
                    {rating === 2 && 'Not great'}
                    {rating === 3 && 'It was okay'}
                    {rating === 4 && 'Pretty good!'}
                    {rating === 5 && 'Amazing!'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="border-0 shadow-lg py-5 mb-4">
              <CardContent className="px-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="well">What went well?</Label>
                  <Textarea
                    id="well"
                    placeholder="Great conversation, good chemistry, loved the venue..."
                    value={whatWentWell}
                    onChange={e => setWhatWentWell(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="awkward">What was awkward?</Label>
                  <Textarea
                    id="awkward"
                    placeholder="Awkward silences, weird topics, uncomfortable moments..."
                    value={whatWasAwkward}
                    onChange={e => setWhatWasAwkward(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surprises">Any surprises?</Label>
                  <Textarea
                    id="surprises"
                    placeholder="Unexpected topics, surprising things you learned..."
                    value={surprises}
                    onChange={e => setSurprises(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Your Date...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get AI Analysis
                </>
              )}
            </Button>
          </>
        ) : (
          /* Results */
          <div className="space-y-4">
            {/* Success Banner */}
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
              <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-semibold text-emerald-800">Debrief Complete!</h3>
              <p className="text-sm text-emerald-600">Here&apos;s what our dating coach thinks.</p>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-1 py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-8 h-8 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
              ))}
            </div>

            {/* AI Analysis */}
            <Card className="border-0 shadow-lg py-5">
              <CardHeader className="px-6">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-purple-500" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                  {result.analysis}
                </p>
              </CardContent>
            </Card>

            {/* Recommendation */}
            {result.recommendation && (
              <Card className="border-0 shadow-lg py-5">
                <CardHeader className="px-6">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {result.recommendation}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Follow-up Message */}
            {result.followUpMessage && (
              <Card className="border-0 shadow-lg py-5 border-l-4 border-l-emerald-400">
                <CardHeader className="px-6">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    Suggested Follow-up Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <p className="text-gray-700 italic text-sm">&quot;{result.followUpMessage}&quot;</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyMessage}
                    className="mt-3 rounded-full"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        Copy Message
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setView('dashboard')}
                variant="outline"
                className="flex-1 rounded-full"
              >
                Back to Dashboard
              </Button>
              <Button
                onClick={() => setView('newDate')}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full"
              >
                Plan Another Date
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
