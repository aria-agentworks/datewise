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

    const systemPrompt = `You are a brilliant conversation coach who helps people make genuine connections on dates. Generate personalized talking points and conversation guidance. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "icebreakers": ["<icebreaker 1>", "<icebreaker 2>", ...],
  "deepStarters": ["<deep conversation starter 1>", "<deep conversation starter 2>", ...],
  "humorSuggestions": ["<humor suggestion 1>", "<humor suggestion 2>", ...],
  "steeringCues": ["<steering cue 1>", "<steering cue 2>", ...]
}

Provide 4-6 items for each array. Make icebreakers casual and natural. Make deep starters thoughtful but not heavy. Humor suggestions should match the user's style. Steering cues help navigate tricky moments.${lang && lang !== 'en' ? ` IMPORTANT: Respond entirely in ${lang}. All JSON values must be in ${lang}.` : ''}`

    const userPrompt = `Generate talking points for a date:

USER PROFILE:
- Name: ${userProfile.name}
- Communication Style: ${userProfile.communicationStyle}
- Humor Style: ${userProfile.humorStyle}
- Love Language: ${userProfile.loveLanguage}
- Interests: ${userProfile.interests}
- Dating Goals: ${userProfile.datingGoals}

DATE'S INFO:
- Name: ${dateInfo.dateWithName}
- Bio/Profile: ${dateInfo.dateBioText}
- Occasion: ${dateInfo.occasionType}
- Date Number: ${dateInfo.dateNumber}

COMPATIBILITY:
- Score: ${compatibility.score}/100
- Alignment Areas: ${compatibility.alignmentAreas?.join(', ')}
- Topics to Avoid: ${compatibility.topicsToAvoid?.join(', ')}
- Conversation Steer: ${compatibility.conversationSteer?.join(', ')}

Generate personalized talking points that feel natural and authentic.${lang && lang !== 'en' ? ` Respond entirely in ${lang}. All JSON values should be in ${lang}.` : ''}`

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

    await db.compatibilityReport.updateMany({
      where: { dateId },
      data: {
        talkingPoints: JSON.stringify(result.icebreakers || []),
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating talking points:', error)
    return NextResponse.json({ error: 'Failed to generate talking points' }, { status: 500 })
  }
}
