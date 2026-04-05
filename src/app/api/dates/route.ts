import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
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
    
    const date = await db.date.create({
      data: {
        userId: body.userId || 'local-user',
        dateWithName: body.dateWithName,
        datePlatform: body.datePlatform || '',
        dateBioText: body.dateBioText || '',
        occasionType: body.occasionType || 'firstDate',
        dateNumber: body.dateNumber ? parseInt(body.dateNumber) : 1,
        location: body.location || '',
        status: 'planned',
      }
    })
    
    return NextResponse.json(date)
  } catch (error) {
    console.error('Error creating date:', error)
    return NextResponse.json({ error: 'Failed to create date' }, { status: 500 })
  }
}
