import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const userId = await getAuthUser()

    // For unauthenticated users, allow free tier
    const effectiveUserId = userId || 'local-user'

    let sub = await db.subscription.findUnique({ where: { userId: effectiveUserId } })

    // Reset monthly counter if needed
    if (sub && sub.lastResetAt) {
      const now = new Date()
      const lastReset = new Date(sub.lastResetAt)
      if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
        sub = await db.subscription.update({
          where: { userId: effectiveUserId },
          data: { datesThisMonth: 0, lastResetAt: now }
        })
      }
    }

    // Create free subscription if none exists
    if (!sub) {
      sub = await db.subscription.create({
        data: { userId: effectiveUserId, plan: 'free', datesThisMonth: 0 }
      })
    }

    const canCreateDate = sub.plan !== 'free' || sub.datesThisMonth < 1

    return NextResponse.json({
      plan: sub.plan,
      datesThisMonth: sub.datesThisMonth,
      canCreateDate,
      isPaid: sub.plan !== 'free',
    })
  } catch (error) {
    return NextResponse.json({
      plan: 'free',
      datesThisMonth: 0,
      canCreateDate: true,
      isPaid: false,
    })
  }
}
