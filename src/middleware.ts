import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/create-order',
  '/api/verify-payment',
])

export default clerkMiddleware(async (auth, request) => {
  // Public routes don't need auth
  if (isPublicRoute(request)) {
    return
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
