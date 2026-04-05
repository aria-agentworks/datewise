'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Compass,
  MessageCircleHeart,
  UserPlus,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Zap,
  ShieldCheck,
  TrendingUp,
  Target,
  CupSoda,
  MapPin,
  Shirt,
  Smile,
  Quote,
  Flame,
  Trophy,
  Users,
  CalendarCheck,
  Gem,
  Handshake,
  LogIn,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const PLANS = {
  free: { display: '$0', price: 0, label: 'Free' },
  pro:  { display: '$9.99', price: 9.99, label: 'Pro' },
  vip:  { display: '$19.99', price: 19.99, label: 'VIP' },
}

// Currency formatting based on user locale
function useUserCurrency() {
  const [currency, setCurrency] = useState('USD')
  useEffect(() => {
    try {
      const locale = navigator.language || 'en-US'
      const region = locale.split('-')[1]?.toUpperCase() || 'US'
      const currencyMap: Record<string, string> = {
        IN: 'INR', US: 'USD', GB: 'GBP', EU: 'EUR', DE: 'EUR', FR: 'EUR',
        AU: 'AUD', CA: 'CAD', SG: 'SGD', AE: 'AED', JP: 'JPY', BR: 'BRL',
        MX: 'MXN', ZA: 'ZAR', CH: 'CHF', SE: 'SEK', NO: 'NOK',
      }
      setCurrency(currencyMap[region] || 'USD')
    } catch {
      setCurrency('USD')
    }
  }, [])
  return currency
}

function formatPrice(usdAmount: number, cur: string): string {
  if (cur === 'USD') return `$${usdAmount.toFixed(2)}`
  if (cur === 'INR') {
    const inr = Math.round(usdAmount * 83)
    return `₹${inr}`
  }
  if (cur === 'GBP') return `£${(usdAmount * 0.79).toFixed(2)}`
  if (cur === 'EUR') return `€${(usdAmount * 0.92).toFixed(2)}`
  if (cur === 'AUD') return `A$${(usdAmount * 1.53).toFixed(2)}`
  if (cur === 'CAD') return `C$${(usdAmount * 1.36).toFixed(2)}`
  return `$${usdAmount.toFixed(2)}`
}

export default function LandingView() {
  const setView = useAppStore((s) => s.setView)
  const userCurrency = useUserCurrency()

  const handleGetStarted = () => {
    setView('signUp')
  }

  const handleUpgrade = (plan: 'pro' | 'vip') => {
    openRazorpay(plan)
  }

  const openRazorpay = (plan: 'pro' | 'vip') => {
    // Create order and open Razorpay checkout
    fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, currency: userCurrency }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
          return
        }
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: 'DateWise',
          description: `${plan === 'pro' ? 'Pro' : 'VIP'} Plan - Monthly`,
          order_id: data.orderId,
          handler: function (response: any) {
            fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: data.plan,
              }),
            })
              .then((r) => r.json())
              .then((result) => {
                if (result.success) {
                  setView('dashboard')
                }
              })
          },
          prefill: {
            name: '',
            email: '',
          },
          theme: {
            color: '#f43f5e',
          },
        }
        const RazorpayClass = (window as unknown as Record<string, unknown>).Razorpay as new (opts: Record<string, unknown>) => { open: () => void }
        const rzp = new RazorpayClass(options)
        rzp.open()
      })
      .catch(() => {
        alert('Failed to initiate payment. Please try again.')
      })
  }

  return (
    <div className="view-enter min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50" />
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-rose-200/40 to-pink-300/30 rounded-full blur-3xl animate-[blob1_8s_ease-in-out_infinite]" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-fuchsia-200/20 rounded-full blur-3xl animate-[blob2_10s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-rose-200/20 rounded-full blur-3xl animate-[blob3_12s_ease-in-out_infinite]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />

        {/* Floating decorative icons */}
        <div className="absolute top-20 left-[10%] opacity-20 animate-pulse">
          <Heart className="w-10 h-10 text-rose-400" />
        </div>
        <div className="absolute top-32 right-[15%] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-pink-400" />
        </div>
        <div className="absolute top-52 left-[20%] opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Heart className="w-6 h-6 text-orange-300" />
        </div>
        <div className="absolute bottom-40 right-[10%] opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Compass className="w-8 h-8 text-rose-300" />
        </div>
        <div className="absolute top-16 right-[30%] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}>
          <MessageCircleHeart className="w-6 h-6 text-pink-500" />
        </div>
        <div className="absolute bottom-60 left-[8%] opacity-10 animate-pulse" style={{ animationDelay: '0.8s' }}>
          <Trophy className="w-7 h-7 text-amber-400" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-rose-100 text-rose-700 border-rose-200">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI-Powered Dating Coach
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Know Before{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                You Go
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered dating preparation that helps you make real connections.
              Get compatibility insights, personalized date plans, and conversation guides — all before your date.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg shadow-rose-200 text-base px-8 h-12 rounded-full"
              >
                <Heart className="mr-2 w-4 h-4" />
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setView('signIn')}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-rose-50 text-base px-8 h-12"
              >
                <LogIn className="mr-2 w-4 h-4" />
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: CalendarCheck, value: '10,000+', label: 'Dates Planned' },
              { icon: Heart, value: '92%', label: 'Felt More Confident' },
              { icon: TrendingUp, value: '3.2x', label: 'More Second Dates' },
              { icon: Users, value: '50,000+', label: 'Happy Users' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-rose-50 rounded-xl">
                  <stat.icon className="w-5 h-5 text-rose-500" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The DateWise Promise */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-rose-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-amber-100 text-amber-700 border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              The DateWise Promise
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Every Date Has Two Outcomes.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                Both Are Wins.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Worst Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border border-gray-200 hover:border-orange-200 transition-colors py-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full" />
                <CardContent className="px-6 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Flame className="w-8 h-8 text-orange-500" />
                  </div>
                  <span className="inline-block text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    At minimum
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">A Date Worth Remembering</h3>
                  <p className="text-gray-500 leading-relaxed mb-5">
                    Even in the best-case scenario where things don&apos;t click romantically, your preparation ensures the date is enjoyable, memorable, and respectful. No awkward silences. No missed connections.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50/50">
                      <Smile className="w-3 h-3 mr-1" /> Great Conversation
                    </Badge>
                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50/50">
                      <CupSoda className="w-3 h-3 mr-1" /> Fun Experience
                    </Badge>
                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50/50">
                      <Handshake className="w-3 h-3 mr-1" /> No Regrets
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Center Arrow / Best Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-rose-400 relative shadow-xl shadow-rose-100/60 py-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50" />
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-200/20 to-transparent rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-200/20 to-transparent rounded-tl-full" />
                <CardContent className="px-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-200">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 px-3 py-0.5">
                      <Gem className="w-3 h-3 mr-1" /> Best Case
                    </Badge>
                  </div>
                  <span className="inline-block text-xs font-bold text-rose-500 bg-rose-100 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    The dream outcome
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">They Become Your Partner</h3>
                  <p className="text-gray-600 leading-relaxed mb-5">
                    With the right preparation, genuine connection, and confidence — your date sees the real, best version of you. That&apos;s how first dates become &quot;how we met&quot; stories.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge className="bg-rose-100 text-rose-700 border-rose-200">
                      <Heart className="w-3 h-3 mr-1" /> Real Connection
                    </Badge>
                    <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                      <Trophy className="w-3 h-3 mr-1" /> Found The One
                    </Badge>
                    <Badge className="bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200">
                      <Sparkles className="w-3 h-3 mr-1" /> Love Story
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border border-gray-200 hover:border-rose-200 transition-colors py-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-rose-50 to-transparent rounded-br-full" />
                <CardContent className="px-6 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Target className="w-8 h-8 text-rose-500" />
                  </div>
                  <span className="inline-block text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    Our role
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Preparation &amp; Execution</h3>
                  <p className="text-gray-500 leading-relaxed mb-5">
                    We don&apos;t guarantee love — nobody can. But we guarantee you&apos;ll walk into every date prepared, confident, and ready to put your best foot forward. The rest is up to you.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50/50">
                      <Compass className="w-3 h-3 mr-1" /> Compatibility
                    </Badge>
                    <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50/50">
                      <MessageCircleHeart className="w-3 h-3 mr-1" /> Conversation
                    </Badge>
                    <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50/50">
                      <Zap className="w-3 h-3 mr-1" /> Confidence
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for a great date
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Three powerful AI features working together to prepare you for meaningful connections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-100/80 transition-shadow duration-300 py-8">
                <CardContent className="px-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Compass className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Compatibility Analysis</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    Get deep insights into your compatibility score, alignment areas, and potential friction points before you meet.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-rose-400" /> Score</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-rose-400" /> Values</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3 text-rose-400" /> Red Flags</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-100/80 transition-shadow duration-300 py-8">
                <CardContent className="px-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Heart className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Date Planner</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    AI-generated venue suggestions, timing recommendations, outfit advice, and budget estimates tailored to your date.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-orange-400" /> Venues</span>
                    <span className="flex items-center gap-1"><Shirt className="w-3 h-3 text-orange-400" /> Outfits</span>
                    <span className="flex items-center gap-1"><CupSoda className="w-3 h-3 text-orange-400" /> Budget</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-0 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-100/80 transition-shadow duration-300 py-8">
                <CardContent className="px-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <MessageCircleHeart className="w-7 h-7 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Conversation Guide</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    Never run out of things to say. Get personalized icebreakers, deep starters, and steering cues for natural conversations.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-pink-400" /> Icebreakers</span>
                    <span className="flex items-center gap-1"><MessageCircleHeart className="w-3 h-3 text-pink-400" /> Deep Talk</span>
                    <span className="flex items-center gap-1"><Smile className="w-3 h-3 text-pink-400" /> Humor</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-rose-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Three simple steps to a more confident dating life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                icon: UserPlus,
                title: 'Build Your Profile',
                description: 'Tell us about yourself — your personality, interests, dating style, and what you\'re looking for.',
                details: ['Personality traits', 'Interests & hobbies', 'Dating goals'],
                color: 'from-rose-500 to-pink-500',
                bg: 'bg-rose-50',
              },
              {
                step: '02',
                icon: Zap,
                title: 'Plan Your Date',
                description: 'Enter your date\'s details and get AI-powered compatibility analysis and a personalized date plan.',
                details: ['Compatibility score', 'Venue & outfit', 'Timing & budget'],
                color: 'from-orange-500 to-amber-500',
                bg: 'bg-orange-50',
              },
              {
                step: '03',
                icon: MessageCircleHeart,
                title: 'Get Talking Points',
                description: 'Receive tailored conversation starters, icebreakers, and tips to keep the conversation flowing naturally.',
                details: ['Icebreakers', 'Deep topics', 'Fun stories to share'],
                color: 'from-pink-500 to-fuchsia-500',
                bg: 'bg-pink-50',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                {i < 2 && (
                  <div className="hidden md:flex absolute top-12 left-[60%] w-[80%] items-center justify-center">
                    <div className="w-full border-t-2 border-dashed border-rose-200" />
                    <ArrowRight className="absolute w-4 h-4 text-rose-300 -mt-0.5" />
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${item.bg} mb-6 relative z-10`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-sm font-bold text-rose-400 tracking-widest">{item.step}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-4">{item.description}</p>
                <div className="flex flex-col items-center gap-1.5">
                  {item.details.map((d) => (
                    <span key={d} className="text-xs text-gray-400 flex items-center gap-1">
                      <Check className="w-3 h-3 text-rose-400" /> {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What our users say
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Real stories from people who dated smarter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'Rahul',
                location: 'Mumbai',
                text: 'I used to be terrible at first dates — awkward silences, wrong venues, the whole deal. DateWise literally gave me a game plan. My last date? She said it was the best first date she ever had.',
                stars: 5,
                icon: '🔥',
              },
              {
                name: 'Sarah',
                location: 'London',
                text: 'The talking points feature is genius. It didn\'t feel scripted at all — more like someone reminded me of interesting things about myself that I could share naturally.',
                stars: 5,
                icon: '💕',
              },
              {
                name: 'James',
                location: 'Toronto',
                text: 'We\'ve been together 6 months now. I still have the compatibility report DateWise gave me — it was spot on about our shared values. This app gave me the confidence to show up as my best self.',
                stars: 5,
                icon: '💍',
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow py-6 px-6">
                  <CardContent className="p-0">
                    <Quote className="w-8 h-8 text-rose-200 mb-3" />
                    <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: testimonial.stars }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">{testimonial.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-24 bg-gradient-to-b from-white to-rose-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Start free and upgrade when you&apos;re ready for more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border border-gray-200 hover:border-rose-200 transition-colors py-8">
                <CardContent className="px-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">Free</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">{formatPrice(0, userCurrency)}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Perfect for getting started</p>

                  <Button
                    onClick={handleGetStarted}
                    variant="outline"
                    className="w-full rounded-full mb-6"
                  >
                    Start Free
                  </Button>

                  <ul className="space-y-3">
                    {[
                      '1 date per month',
                      'Basic compatibility score',
                      'Simple date plan',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-rose-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-rose-500 relative shadow-xl shadow-rose-100/50 py-8">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 px-3 py-0.5">
                    <Star className="w-3 h-3 mr-1" /> Most Popular
                  </Badge>
                </div>
                <CardContent className="px-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-rose-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">{formatPrice(9.99, userCurrency)}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">For serious daters</p>

                  <Button
                    onClick={() => handleUpgrade('pro')}
                    className="w-full rounded-full mb-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  >
                    Get Pro — {formatPrice(9.99, userCurrency)}/mo
                  </Button>

                  <ul className="space-y-3">
                    {[
                      'Unlimited dates',
                      'Full compatibility analysis',
                      'Personalized date plans',
                      'Conversation guides',
                      'Post-date debrief AI',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-rose-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* VIP Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border border-gray-200 hover:border-rose-200 transition-colors py-8">
                <CardContent className="px-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gem className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-gray-900">VIP</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">{formatPrice(19.99, userCurrency)}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">All-access dating companion</p>

                  <Button
                    onClick={() => handleUpgrade('vip')}
                    variant="outline"
                    className="w-full rounded-full mb-6"
                  >
                    Get VIP — {formatPrice(19.99, userCurrency)}/mo
                  </Button>

                  <ul className="space-y-3">
                    {[
                      'Everything in Pro',
                      'Advanced personality matching',
                      'Weekly dating strategy sessions',
                      'Priority AI analysis',
                      'Relationship coaching',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-rose-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-rose-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%]"><Heart className="w-16 h-16 text-white" /></div>
          <div className="absolute top-20 right-[15%]"><Sparkles className="w-12 h-12 text-white" /></div>
          <div className="absolute bottom-10 left-[30%]"><Heart className="w-10 h-10 text-white" /></div>
          <div className="absolute bottom-20 right-[25%]"><MessageCircleHeart className="w-14 h-14 text-white" /></div>
          <div className="absolute top-1/2 left-[5%]"><Trophy className="w-8 h-8 text-white" /></div>
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Your next date could change everything.
          </h2>
          <p className="text-rose-100 text-lg mb-4 max-w-xl mx-auto">
            Walk in prepared. Walk out with a connection. At the very least, you&apos;ll have a great story to tell.
            At best? You&apos;ll be telling it together.
          </p>
          <p className="text-white/80 text-sm mb-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Worst case: a memorable date. Best case: a partner for life.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg text-base px-8 h-12 rounded-full font-semibold"
          >
            <Heart className="mr-2 w-4 h-4" />
            Start Your Journey
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-50 border-t">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="font-bold text-gray-900">DateWise</span>
            </div>
            <p className="text-sm text-gray-500 text-center">
              &copy; {new Date().getFullYear()} DateWise AI. Making real connections, one date at a time.
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <Heart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
              <Compass className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
              <MessageCircleHeart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
