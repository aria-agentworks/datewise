import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const userId = await getAuthUser()

    if (userId) {
      const dates = await db.date.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(dates)
    }

    // Fallback: return all dates (legacy)
    const dates = await db.date.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(dates)
  } catch (error) {
    console.error('Error fetching dates:', error)
    return NextResponse.json({ error: 'Failed to fetch dates' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const userId = await getAuthUser()

    const effectiveUserId = userId || 'local-user'

    // Check subscription limits
    const sub = await db.subscription.findUnique({
      where: { userId: effectiveUserId }
    })

    if (sub && sub.plan === 'free') {
      const now = new Date()
      const lastReset = new Date(sub.lastResetAt)
      if (now.getMonth() === lastReset.getMonth() && now.getFullYear() === lastReset.getFullYear()) {
        if (sub.datesThisMonth >= 1) {
          return NextResponse.json(
            { error: 'limit_reached', message: "You've used your free date this month. Upgrade to Pro for unlimited dates!" },
            { status: 403 }
          )
        }
      }
    }

    const date = await db.date.create({
      data: {
        userId: effectiveUserId,
        dateWithName: body.dateWithName,
        datePlatform: body.datePlatform || '',
        dateBioText: body.dateBioText || '',
        occasionType: body.occasionType || 'firstDate',
        dateNumber: body.dateNumber ? parseInt(body.dateNumber) : 1,
        location: body.location || '',
        status: 'planned',
      }
    })

    // Increment date counter for free users
    if (sub && sub.plan === 'free') {
      const now = new Date()
      const lastReset = new Date(sub.lastResetAt)
      if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
        await db.subscription.update({
          where: { userId: effectiveUserId },
          data: { datesThisMonth: 1, lastResetAt: now }
        })
      } else {
        await db.subscription.update({
          where: { userId: effectiveUserId },
          data: { datesThisMonth: { increment: 1 } }
        })
      }
    }

    return NextResponse.json(date)
  } catch (error) {
    console.error('Error creating date:', error)
    return NextResponse.json({ error: 'Failed to create date' }, { status: 500 })
  }
}
