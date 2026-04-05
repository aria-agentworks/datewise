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

    const { plan, currency: userCurrency } = await request.json()

    // Multi-currency pricing — Razorpay handles FX automatically
    // All amounts are in the smallest currency unit (cents for USD, paise for INR, etc.)
    const pricing: Record<string, Record<string, { amount: number; currency: string }>> = {
      pro: {
        USD: { amount: 999, currency: 'USD' },   // $9.99
        EUR: { amount: 999, currency: 'EUR' },   // €9.99
        GBP: { amount: 799, currency: 'GBP' },   // £7.99
        INR: { amount: 29900, currency: 'INR' }, // ₹299
        AUD: { amount: 1499, currency: 'AUD' },  // A$14.99
        CAD: { amount: 1399, currency: 'CAD' },  // C$13.99
      },
      vip: {
        USD: { amount: 1999, currency: 'USD' },   // $19.99
        EUR: { amount: 1999, currency: 'EUR' },   // €19.99
        GBP: { amount: 1599, currency: 'GBP' },   // £15.99
        INR: { amount: 59900, currency: 'INR' },  // ₹599
        AUD: { amount: 2999, currency: 'AUD' },   // A$29.99
        CAD: { amount: 2799, currency: 'CAD' },   // C$27.99
      },
    }

    // Default to USD if no currency or unsupported currency provided
    const planPricing = pricing[plan] || pricing.pro
    const priceConfig = planPricing[userCurrency?.toUpperCase()] || planPricing.USD

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: priceConfig.amount,
      currency: priceConfig.currency,
      receipt: `datewise_${userId}_${plan}_${Date.now()}`,
      notes: { userId, plan, currency: priceConfig.currency },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      plan,
    })
  } catch (error) {
    console.error('Razorpay order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
