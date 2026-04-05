'use client'

import { useAppStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n'
import { usePWA } from '@/hooks/use-pwa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Plus,
  MapPin,
  Heart,
  Clock,
  User,
  Sparkles,
  Download,
  Crown,
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DashboardView() {
  const setView = useAppStore((s) => s.setView)
  const setSelectedDateId = useAppStore((s) => s.setSelectedDateId)
  const { t } = useTranslation()
  const [dates, setDates] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { canInstall, promptInstall } = usePWA()

  useEffect(() => {
    async function loadData() {
      try {
        const [datesRes, profileRes] = await Promise.all([fetch('/api/dates'), fetch('/api/profile')])
        const datesData = await datesRes.json()
        const profileData = await profileRes.json()
        setDates(datesData || [])
        setProfile(profileData)
        setSubscription(profileData?.subscription || null)
      } catch (e) { console.error(e) } finally { setLoading(false) }
    }
    loadData()
  }, [])

  const openDate = (dateId: string) => { setSelectedDateId(dateId); setView('dateDetail') }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return t.dashboard.statusCompleted
      case 'cancelled': return t.dashboard.statusCancelled
      default: return t.dashboard.statusPlanned
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
        <div className="max-w-2xl mx-auto space-y-4"><Skeleton className="h-8 w-48" /><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /><Skeleton className="h-32 w-full" /></div>
      </div>
    )
  }

  return (
    <div className="view-enter min-h-screen bg-gradient-to-b from-rose-50/50 to-white py-8 px-4 pb-32">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile?.name ? `${profile.name}` : t.dashboard.yourDashboard}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-500 text-sm">
                  {dates.length === 0 ? t.dashboard.noDatesYet : `${dates.length} ${dates.length === 1 ? t.dashboard.datesSingular : t.dashboard.datesPlural}`}
                </p>
                {subscription?.plan && subscription.plan !== 'free' && (
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 text-xs px-2 py-0.5">
                    <Crown className="w-3 h-3 mr-1" />{subscription.plan.toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canInstall && (
              <Button variant="outline" size="sm" onClick={promptInstall} className="rounded-full text-xs">
                <Download className="w-3.5 h-3.5 mr-1" />{t.common.install}
              </Button>
            )}
            <Button onClick={() => setView('newDate')} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full shadow-lg shadow-rose-200">
              <Plus className="w-4 h-4 mr-2" />{t.nav.newDate}
            </Button>
          </div>
        </div>

        {dates.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center"><div className="text-2xl font-bold text-rose-500">{dates.length}</div><div className="text-xs text-gray-500 mt-1">{t.dashboard.totalDates}</div></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center"><div className="text-2xl font-bold text-emerald-500">{dates.filter(d => d.status === 'completed').length}</div><div className="text-xs text-gray-500 mt-1">{t.dashboard.completed}</div></div>
            <div className="bg-white rounded-xl p-4 shadow-sm border text-center"><div className="text-2xl font-bold text-amber-500">{dates.filter(d => d.status === 'planned').length}</div><div className="text-xs text-gray-500 mt-1">{t.dashboard.planned}</div></div>
          </div>
        )}

        <div className="space-y-3">
          {dates.length === 0 ? (
            <Card className="border-0 shadow-lg py-12"><CardContent className="px-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-5"><Heart className="w-10 h-10 text-rose-400" /></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.dashboard.readyForFirstDate}</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">{t.dashboard.readyForFirstDateDesc}</p>
              <Button onClick={() => setView('newDate')} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full"><Plus className="w-4 h-4 mr-2" />{t.dashboard.planFirstDate}</Button>
            </CardContent></Card>
          ) : (
            dates.map((date) => (
              <Card key={date.id} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer py-4 group" onClick={() => openDate(date.id)}>
                <CardContent className="px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center shrink-0"><User className="w-6 h-6 text-rose-500" /></div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{date.dateWithName}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          {date.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{date.location}</span>}
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(date.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`${getStatusColor(date.status)} text-xs px-2 py-0.5`}>{getStatusLabel(date.status)}</Badge>
                      {date.dateNumber && <Badge variant="secondary" className="text-xs">{date.dateNumber === 1 ? '1st' : date.dateNumber === 2 ? '2nd' : date.dateNumber === 3 ? '3rd' : `${date.dateNumber}th`} {t.dashboard.dateNot}</Badge>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
