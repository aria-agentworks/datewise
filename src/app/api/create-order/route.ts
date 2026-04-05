import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const userId = await getAuthUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment system is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env' }, { status: 503 })
    }

    const { plan } = await request.json()

    const prices: Record<string, number> = { pro: 29900, vip: 59900 }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: prices[plan] || prices.pro,
      currency: 'INR',
      receipt: `datewise_${userId}_${plan}_${Date.now()}`,
      notes: { userId, plan },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      plan
    })
  } catch (error) {
    console.error('Razorpay order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
