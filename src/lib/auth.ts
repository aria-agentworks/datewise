import { auth } from '@clerk/nextjs/server'

export async function getAuthUser() {
  const { userId } = await auth()
  if (!userId) return null
  return userId
}

export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  return userId
}
