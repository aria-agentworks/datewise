import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const date = await db.date.findUnique({
      where: { id }
    })
    
    if (!date) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 })
    }
    
    const compatibility = await db.compatibilityReport.findFirst({
      where: { dateId: id }
    })
    
    const plan = await db.datePlan.findFirst({
      where: { dateId: id }
    })
    
    const debrief = await db.postDateDebrief.findFirst({
      where: { dateId: id }
    })
    
    return NextResponse.json({
      date,
      compatibility: compatibility ? {
        ...compatibility,
        alignmentAreas: JSON.parse(compatibility.alignmentAreas || '[]'),
        frictionPoints: JSON.parse(compatibility.frictionPoints || '[]'),
        talkingPoints: JSON.parse(compatibility.talkingPoints || '[]'),
        topicsToAvoid: JSON.parse(compatibility.topicsToAvoid || '[]'),
        compliments: JSON.parse(compatibility.compliments || '[]'),
        conversationSteer: JSON.parse(compatibility.conversationSteer || '[]'),
      } : null,
      plan,
      debrief,
    })
  } catch (error) {
    console.error('Error fetching date details:', error)
    return NextResponse.json({ error: 'Failed to fetch date details' }, { status: 500 })
  }
}
