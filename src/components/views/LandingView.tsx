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
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandingView() {
  const setView = useAppStore((s) => s.setView)

  return (
    <div className="view-enter min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50" />
        <div className="absolute inset-0 opacity-30">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
        
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
                onClick={() => setView('profile')}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg shadow-rose-200 text-base px-8 h-12 rounded-full"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setView('pricing')}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-rose-50 text-base px-8 h-12"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
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
                  <p className="text-gray-500 leading-relaxed">
                    Get deep insights into your compatibility score, alignment areas, and potential friction points before you meet.
                  </p>
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
                  <p className="text-gray-500 leading-relaxed">
                    AI-generated venue suggestions, timing recommendations, outfit advice, and budget estimates tailored to your date.
                  </p>
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
                  <p className="text-gray-500 leading-relaxed">
                    Never run out of things to say. Get personalized icebreakers, deep starters, and steering cues for natural conversations.
                  </p>
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
                color: 'from-rose-500 to-pink-500',
                bg: 'bg-rose-50',
              },
              {
                step: '02',
                icon: Zap,
                title: 'Plan Your Date',
                description: 'Enter your date\'s details and get AI-powered compatibility analysis and a personalized date plan.',
                color: 'from-orange-500 to-amber-500',
                bg: 'bg-orange-50',
              },
              {
                step: '03',
                icon: MessageCircleHeart,
                title: 'Get Talking Points',
                description: 'Receive tailored conversation starters, icebreakers, and tips to keep the conversation flowing naturally.',
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
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-rose-200" />
                )}
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${item.bg} mb-6 relative z-10`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="text-sm font-bold text-rose-400 tracking-widest">{item.step}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-24 bg-white">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Perfect for getting started</p>
                  
                  <Button
                    onClick={() => setView('profile')}
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">For serious daters</p>
                  
                  <Button
                    onClick={() => setView('profile')}
                    className="w-full rounded-full mb-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  >
                    Get Pro
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">VIP</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">$19.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">All-access dating companion</p>
                  
                  <Button
                    onClick={() => setView('profile')}
                    variant="outline"
                    className="w-full rounded-full mb-6"
                  >
                    Get VIP
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

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to transform your dating life?
          </h2>
          <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of singles who are dating smarter with AI-powered preparation.
          </p>
          <Button
            size="lg"
            onClick={() => setView('profile')}
            className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg text-base px-8 h-12 rounded-full font-semibold"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 DateWise AI. Making real connections, one date at a time.
          </p>
        </div>
      </footer>
    </div>
  )
}
