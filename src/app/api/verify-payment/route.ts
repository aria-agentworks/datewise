import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const userId = await getAuthUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body

    if (!razorpay_signature || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment' }, { status: 400 })
    }

    await db.subscription.upsert({
      where: { userId },
      create: { userId, plan: plan || 'pro', razorpaySubscriptionId: razorpay_payment_id, datesThisMonth: 0, lastResetAt: new Date() },
      update: { plan: plan || 'pro', razorpaySubscriptionId: razorpay_payment_id, datesThisMonth: 0, lastResetAt: new Date() },
    })

    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
