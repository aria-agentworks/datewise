import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { dateId, userProfile, dateInfo, lang } = body

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

    const systemPrompt = `You are an expert dating coach AI with deep knowledge of personality psychology, relationship dynamics, and compatibility analysis. Analyze the compatibility between two people based on their profiles and return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "score": <number 1-100>,
  "alignmentAreas": ["<area 1>", "<area 2>", ...],
  "frictionPoints": ["<point 1>", "<point 2>", ...],
  "talkingPoints": ["<point 1>", "<point 2>", ...],
  "topicsToAvoid": ["<topic 1>", "<topic 2>", ...],
  "compliments": ["<compliment 1>", "<compliment 2>", ...],
  "conversationSteer": ["<cue 1>", "<cue 2>", ...]
}

Be insightful, specific, and practical. The score should reflect genuine compatibility based on the information provided. Provide 4-6 items for each array. Be encouraging but honest.${lang && lang !== 'en' ? ` IMPORTANT: Respond entirely in ${lang}. All text in the JSON values (alignmentAreas, frictionPoints, talkingPoints, topicsToAvoid, compliments, conversationSteer) must be in ${lang}.` : ''}`

    const userPrompt = `Analyze compatibility between these two people:

USER PROFILE:
- Name: ${userProfile.name}
- Gender: ${userProfile.gender}
- Age: ${userProfile.age}
- Body Type: ${userProfile.bodyType}
- Communication Style: ${userProfile.communicationStyle}
- Humor Style: ${userProfile.humorStyle}
- Love Language: ${userProfile.loveLanguage}
- Interests: ${userProfile.interests}
- Deal Breakers: ${userProfile.dealBreakers}
- Dating Goals: ${userProfile.datingGoals}
- Budget Range: ${userProfile.budgetRange}
- Preferred Date Setting: ${userProfile.preferredDateSetting}

DATE'S INFO:
- Name: ${dateInfo.dateWithName}
- Met On: ${dateInfo.datePlatform}
- Bio/Profile Info: ${dateInfo.dateBioText}
- Occasion: ${dateInfo.occasionType}
- Date Number: ${dateInfo.dateNumber}
- Location: ${dateInfo.location}

Please analyze their compatibility and provide the JSON response.${lang && lang !== 'en' ? ` Respond entirely in ${lang}. All JSON values should be in ${lang}.` : ''}`

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

    const report = await db.compatibilityReport.create({
      data: {
        dateId: dateId,
        score: result.score || 50,
        alignmentAreas: JSON.stringify(result.alignmentAreas || []),
        frictionPoints: JSON.stringify(result.frictionPoints || []),
        talkingPoints: JSON.stringify(result.talkingPoints || []),
        topicsToAvoid: JSON.stringify(result.topicsToAvoid || []),
        compliments: JSON.stringify(result.compliments || []),
        conversationSteer: JSON.stringify(result.conversationSteer || []),
      }
    })

    return NextResponse.json({ ...result, id: report.id, dateId: report.dateId })
  } catch (error) {
    console.error('Error in compatibility analysis:', error)
    return NextResponse.json({ error: 'Failed to analyze compatibility' }, { status: 500 })
  }
}
