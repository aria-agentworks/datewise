'use client'
import { create } from 'zustand'

export type View = 'landing' | 'profile' | 'newDate' | 'dateDetail' | 'dashboard' | 'debrief' | 'pricing'

interface AppState {
  currentView: View
  selectedDateId: string | null
  setView: (view: View) => void
  setSelectedDateId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'landing',
  selectedDateId: null,
  setView: (view) => set({ currentView: view }),
  setSelectedDateId: (id) => set({ selectedDateId: id }),
}))
