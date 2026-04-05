'use client'

import { useAppStore } from '@/lib/store'
import LandingView from '@/components/views/LandingView'
import ProfileBuilderView from '@/components/views/ProfileBuilderView'
import NewDateView from '@/components/views/NewDateView'
import DashboardView from '@/components/views/DashboardView'
import DateDetailView from '@/components/views/DateDetailView'
import DebriefView from '@/components/views/DebriefView'
import { Home as HomeIcon, LayoutDashboard, PlusCircle } from 'lucide-react'

export default function Home() {
  const currentView = useAppStore((s) => s.currentView)
  const setView = useAppStore((s) => s.setView)

  const showNav = currentView !== 'landing'

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Top Navigation */}
      {showNav && (
        <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 py-3">
          <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
            <button
              onClick={() => setView('landing')}
              className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent"
            >
              DateWise
            </button>
            <div className="flex items-center gap-1">
              <NavButton
                icon={<HomeIcon className="w-4 h-4" />}
                label="Home"
                active={currentView === 'landing' || currentView === 'profile'}
                onClick={() => setView('landing')}
              />
              <NavButton
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Dashboard"
                active={currentView === 'dashboard' || currentView === 'dateDetail'}
                onClick={() => setView('dashboard')}
              />
              <NavButton
                icon={<PlusCircle className="w-4 h-4" />}
                label="New Date"
                active={currentView === 'newDate'}
                onClick={() => setView('newDate')}
              />
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={showNav ? 'md:pt-16' : ''}>
        {currentView === 'landing' && <LandingView />}
        {currentView === 'profile' && <ProfileBuilderView />}
        {currentView === 'newDate' && <NewDateView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'dateDetail' && <DateDetailView />}
        {currentView === 'debrief' && <DebriefView />}
        {currentView === 'pricing' && <LandingView />}
      </main>

      {/* Mobile Bottom Navigation */}
      {showNav && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t px-2 py-2 safe-area-bottom">
          <div className="flex items-center justify-around">
            <MobileNavButton
              icon={<HomeIcon className="w-5 h-5" />}
              label="Home"
              active={currentView === 'landing' || currentView === 'profile'}
              onClick={() => setView('landing')}
            />
            <MobileNavButton
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Dashboard"
              active={currentView === 'dashboard' || currentView === 'dateDetail'}
              onClick={() => setView('dashboard')}
            />
            <MobileNavButton
              icon={<PlusCircle className="w-5 h-5" />}
              label="New Date"
              active={currentView === 'newDate'}
              onClick={() => setView('newDate')}
              highlight
            />
          </div>
        </nav>
      )}
    </div>
  )
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? 'bg-rose-50 text-rose-600'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function MobileNavButton({
  icon,
  label,
  active,
  onClick,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  highlight?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
        highlight
          ? active
            ? 'bg-rose-500 text-white'
            : 'text-rose-500'
          : active
            ? 'bg-rose-50 text-rose-600'
            : 'text-gray-400'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
