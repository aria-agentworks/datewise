import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const userId = await getAuthUser()

    if (!userId) {
      // Allow unauthenticated access for backwards compatibility
      const profile = await db.userProfile.findFirst({
        orderBy: { createdAt: 'desc' }
      })
      const sub = await db.subscription.findFirst()
      return NextResponse.json({ ...profile, subscription: sub || null })
    }

    const profile = await db.userProfile.findUnique({
      where: { userId }
    })

    const sub = await db.subscription.findUnique({
      where: { userId }
    })

    // Reset monthly counter if needed
    if (sub) {
      const now = new Date()
      const lastReset = new Date(sub.lastResetAt)
      if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
        await db.subscription.update({
          where: { userId },
          data: { datesThisMonth: 0, lastResetAt: now }
        })
      }
    }

    return NextResponse.json({ ...profile, subscription: sub || null })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const userId = await getAuthUser()

    if (userId) {
      // Authenticated: upsert by userId
      const existing = await db.userProfile.findUnique({ where: { userId } })
      let profile
      if (existing) {
        profile = await db.userProfile.update({
          where: { userId },
          data: {
            name: body.name,
            gender: body.gender || 'preferNotToSay',
            age: body.age ? parseInt(body.age) : null,
            height: body.height || null,
            bodyType: body.bodyType || 'average',
            communicationStyle: body.communicationStyle || 'thoughtful',
            humorStyle: body.humorStyle || 'warm',
            loveLanguage: body.loveLanguage || 'qualityTime',
            dealBreakers: body.dealBreakers || '',
            interests: body.interests || '',
            datingGoals: body.datingGoals || 'notSure',
            budgetRange: body.budgetRange || 'moderate',
            preferredDateSetting: body.preferredDateSetting || 'coffee',
          }
        })
      } else {
        profile = await db.userProfile.create({
          data: {
            userId,
            name: body.name,
            gender: body.gender || 'preferNotToSay',
            age: body.age ? parseInt(body.age) : null,
            height: body.height || null,
            bodyType: body.bodyType || 'average',
            communicationStyle: body.communicationStyle || 'thoughtful',
            humorStyle: body.humorStyle || 'warm',
            loveLanguage: body.loveLanguage || 'qualityTime',
            dealBreakers: body.dealBreakers || '',
            interests: body.interests || '',
            datingGoals: body.datingGoals || 'notSure',
            budgetRange: body.budgetRange || 'moderate',
            preferredDateSetting: body.preferredDateSetting || 'coffee',
          }
        })
      }
      return NextResponse.json(profile)
    }

    // Fallback for unauthenticated: delete all and create new (legacy behavior)
    await db.userProfile.deleteMany()
    const profile = await db.userProfile.create({
      data: {
        userId: 'local-user',
        name: body.name,
        gender: body.gender || 'preferNotToSay',
        age: body.age ? parseInt(body.age) : null,
        height: body.height || null,
        bodyType: body.bodyType || 'average',
        communicationStyle: body.communicationStyle || 'thoughtful',
        humorStyle: body.humorStyle || 'warm',
        loveLanguage: body.loveLanguage || 'qualityTime',
        dealBreakers: body.dealBreakers || '',
        interests: body.interests || '',
        datingGoals: body.datingGoals || 'notSure',
        budgetRange: body.budgetRange || 'moderate',
        preferredDateSetting: body.preferredDateSetting || 'coffee',
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}
