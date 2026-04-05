import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { dateId, dateData, rating, whatWentWell, whatWasAwkward, surprises } = body

    const zai = await ZAI.create()

    const systemPrompt = `You are a caring but honest dating coach helping someone reflect on their date. Provide an insightful analysis and practical follow-up advice. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "analysis": "<detailed 2-3 paragraph analysis of how the date likely went based on the feedback>",
  "recommendation": "<clear recommendation on next steps - whether to go on another date, what to change, etc.>",
  "followUpMessage": "<a suggested follow-up message to send to the date, tailored to the situation>"
}

Be empathetic but honest. Provide genuinely helpful insights. The follow-up message should feel authentic and not generic.`

    const userPrompt = `Analyze this post-date debrief:

DATE DETAILS:
- Date's Name: ${dateData.dateWithName}
- Occasion: ${dateData.occasionType}
- Date Number: ${dateData.dateNumber}
- Location: ${dateData.location}

USER'S FEEDBACK:
- Rating: ${rating}/5 stars
- What went well: ${whatWentWell}
- What was awkward: ${whatWasAwkward}
- Surprises: ${surprises}

Provide an insightful analysis and practical advice.`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })

    const resultText = completion.choices[0]?.message?.content || '{}'
    const cleanedResult = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(cleanedResult)

    // Save to database
    const debrief = await db.postDateDebrief.create({
      data: {
        dateId: dateId,
        rating: rating || 3,
        whatWentWell: whatWentWell || '',
        whatWasAwkward: whatWasAwkward || '',
        surprises: surprises || '',
        aiAnalysis: result.analysis || '',
        followUpMessage: result.followUpMessage || '',
      }
    })

    // Update date status to completed
    await db.date.update({
      where: { id: dateId },
      data: { status: 'completed' }
    })

    return NextResponse.json({ ...result, id: debrief.id })
  } catch (error) {
    console.error('Error in debrief analysis:', error)
    return NextResponse.json({ error: 'Failed to analyze debrief' }, { status: 500 })
  }
}
