import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, request) => {
  // Only protect API routes (except public ones)
  if (!isPublicRoute(request)) {
    const url = new URL(request.url)
    // For the main page, don't protect since it's a SPA
    if (url.pathname === '/') {
      return
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
