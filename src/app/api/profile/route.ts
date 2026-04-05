import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const profile = await db.userProfile.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(profile || null)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Upsert - delete existing profile and create new one
    await db.userProfile.deleteMany()
    
    const profile = await db.userProfile.create({
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
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }
}
