/** @ts-nocheck */
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { create, createFromImage, query } from '@/skills/video-generation/scripts/video'

// Validate API key (should be set in .env)
const EXPECTED_API_KEY = process.env.VIDEO_RENDER_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Authentication
    const userId = requireAuth()
    
    // API Key validation
    if (!EXPECTED_API_KEY) {
      throw new Error('API key not configured on server')
    }
    
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header. Expected: Bearer <API_KEY>' }, { status: 401 })
    }
    
    const providedKey = authHeader.substring(7)
    if (providedKey !== EXPECTED_API_KEY) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }
    
    // Parse request body
    const body = await request.json()
    const { prompt, image_base64 } = body
    
    if (!prompt && !image_base64) {
      return NextResponse.json({ error: 'Either prompt or image_base64 is required' }, { status: 400 })
    }
    
    // Generate video based on input
    let result
    if (image_base64) {
      // Image-to-video: save base64 to temp file
      const base64Data = image_base64.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const tempFilePath = `/tmp/video-input-${Date.now()}.png`
      await import('fs').then(fs => fs.promises.writeFile(tempFilePath, buffer))
      
      const { task } = await createFromImage(tempFilePath)
      result = { taskId: task.id, status: task.status, type: 'image-to-video' }
      
      // Clean up temp file after a delay
      setTimeout(() => {
        import('fs').then(fs => fs.promises.unlink(tempFilePath).catch(() => {}))
      }, 5000)
    } else {
      // Text-to-video
      const { task } = await create()
      result = { taskId: task.id, status: task.status, type: 'text-to-video' }
    }
    
    return NextResponse.json({ success: true, ...result })
    
  } catch (error) {
    console.error('Video render error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to check task status
export async function GET(request: NextRequest) {
  try {
    requireAuth()
    
    const { searchParams } = new URL(request.url)
    const taskId = searchParams.get('taskId')
    
    if (!taskId) {
      return NextResponse.json({ error: 'taskId is required' }, { status: 400 })
    }
    
    const taskResult = await query(taskId)
    return NextResponse.json({ success: true, taskId, result: taskResult })
    
  } catch (error) {
    console.error('Video query error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
