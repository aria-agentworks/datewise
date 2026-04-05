import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { dateId, userProfile, dateInfo, compatibility, lang } = body

    // Verify date ownership
    const date = await db.date.findUnique({ where: { id: dateId } })
    if (!date) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 })
    }

    const userId = await getAuthUser()
    if (userId && date.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const zai = await ZAI.create()

    const systemPrompt = `You are an expert dating coach and date planner. Create a personalized date plan based on the compatibility analysis and profiles. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "venueName": "<venue name>",
  "venueDescription": "<detailed description of the venue and why it's a good choice>",
  "timingSuggestion": "<detailed timing recommendations for the date>",
  "outfitDescription": "<personalized outfit suggestion>",
  "budgetEstimate": "<estimated cost range>",
  "activitySuggestions": ["<suggestion 1>", "<suggestion 2>", ...]
}

Be specific, creative, and practical. Consider the budget preferences, setting preferences, and compatibility insights.${lang && lang !== 'en' ? ` IMPORTANT: Respond entirely in ${lang}. All JSON values must be in ${lang}.` : ''}`

    const userPrompt = `Create a date plan for:

USER PROFILE:
- Name: ${userProfile.name}
- Gender: ${userProfile.gender}
- Age: ${userProfile.age}
- Body Type: ${userProfile.bodyType}
- Communication Style: ${userProfile.communicationStyle}
- Preferred Date Setting: ${userProfile.preferredDateSetting}
- Budget Range: ${userProfile.budgetRange}
- Interests: ${userProfile.interests}

DATE'S INFO:
- Name: ${dateInfo.dateWithName}
- Occasion: ${dateInfo.occasionType}
- Date Number: ${dateInfo.dateNumber}
- Location: ${dateInfo.location}

COMPATIBILITY INSIGHTS:
- Score: ${compatibility.score}/100
- Alignment Areas: ${compatibility.alignmentAreas?.join(', ')}
- Friction Points: ${compatibility.frictionPoints?.join(', ')}

Create a perfect date plan considering these factors.${lang && lang !== 'en' ? ` Respond entirely in ${lang}. All JSON values should be in ${lang}.` : ''}`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
    })

    const resultText = completion.choices[0]?.message?.content || '{}'
    const cleanedResult = resultText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(cleanedResult)

    const plan = await db.datePlan.create({
      data: {
        dateId: dateId,
        venueName: result.venueName || '',
        venueDescription: result.venueDescription || '',
        timingSuggestion: result.timingSuggestion || '',
        outfitDescription: result.outfitDescription || '',
        budgetEstimate: result.budgetEstimate || '',
      }
    })

    return NextResponse.json({ ...result, id: plan.id, dateId: plan.dateId })
  } catch (error) {
    console.error('Error generating date plan:', error)
    return NextResponse.json({ error: 'Failed to generate date plan' }, { status: 500 })
  }
}
